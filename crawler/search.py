import time
from datetime import datetime

import couchdb
import tweepy

from crawler_info import session, SearchGroup, TwitterAuthentication
from analyzer import get_sentiment_score
from config import Config


class TwitterSearchCrawler(object):
    def __init__(self):
        self.select_key_set()
        self.connect_to_couchdb()

    def select_key_set(self):
        auth_infos = session.query(TwitterAuthentication).all()
        key_set = None

        now = datetime.utcnow()
        for auth_info in auth_infos:
            if not auth_info.exceed_limit_time or (now - auth_info.exceed_limit_time).total_seconds() > 900:
                key_set = auth_info

        if not key_set:
            return False
        else:
            auth = tweepy.OAuthHandler(key_set.consumer_key, key_set.consumer_secret)
            auth.set_access_token(key_set.access_token, key_set.access_token_secret)
            self.api = tweepy.API(auth)
            self.key_set = key_set
            return True

    def connect_to_couchdb(self):
        server = couchdb.Server(Config.SERVER_URL)
        server.resource.credentials = (Config.DB_USER, Config.DB_PASSWD)
        try:
            self.db = server.create(Config.DB)
        except couchdb.http.PreconditionFailed:
            self.db = server[Config.DB]

    def crawl(self, search_group):
        keyword = search_group.keyword
        city = search_group.city
        if search_group.max_id:
            tweets = self.api.search(q=keyword.text,count=Config.MAX_COUNT,result_type="recent",max_id=search_group.max_id,
                                include_entities=True, geocode=city.to_geocode_parameter())
        else:
            tweets = self.api.search(q=keyword.text, count=Config.MAX_COUNT, result_type="recent",
                                include_entities=True, geocode=city.to_geocode_parameter())

        if not len(tweets):
            return

        for tweet in tweets:
            try:
                tweet_data = tweet._json
                existing_tweet = self.db.get(tweet_data["id_str"])
                if existing_tweet is None:
                    tweet_data['_id'] = tweet_data["id_str"]
                    tweet_data['sentiment_score'] = get_sentiment_score(tweet_data['text'])
                    self.db.save(tweet_data)
                else:
                    continue
            except Exception as e:
                print("Error loading tweet ", e)

        # Update max_id
        search_group.max_id = tweets[-1]._json["id_str"]
        session.add(search_group)
        session.commit()


    def run(self):
        while True:
            search_groups = session.query(SearchGroup).all()
            for search_group in search_groups:
                while True:
                    try:
                        self.crawl(search_group)
                        break
                    except Exception as e:
                        # Remember when this key set exceeds the API limit
                        print('[SEARCH] {} exceeds the API limit'.format(self.key_set.consumer_key))
                        self.key_set.exceed_limit_time = datetime.utcnow()
                        session.add(self.key_set)
                        session.commit()

                        # Try to select other key set
                        while True:
                            success = self.select_key_set()
                            if not success:
                                time.sleep(60)
                                continue
                            print('[SEARCH] Select new key set: {}'.format(self.key_set.consumer_key))
                            break


if __name__ == '__main__':
    crawler = TwitterSearchCrawler()
    crawler.run()
