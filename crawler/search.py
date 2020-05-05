import time
from datetime import datetime

import couchdb
import tweepy
import nltk 
nltk.download('punk')
from crawler_info import session, SearchGroup, TwitterAuthentication
from analyzer import get_sentiment_score
from config import Config
import GetOldTweets3 as got


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

    def create_tweet_json(self, tweet):
        tweet_data = {}
        tweet_data['_id'] = tweet.id
        tweet_data['id_str'] = str(tweet.id)
        tweet_data['username'] = tweet.username
        tweet_data['text'] = tweet.text
        tweet_data['hashtags'] = tweet.hashtags
        return tweet_data

    def get_old_tweets(self, search_group):
        tweet_list = []
        keyword = search_group.keyword.text
        city = search_group.city
        print("Retrieving old tweets for ", keyword)
        tweetCriteria = got.manager.TweetCriteria().setQuerySearch(keyword)\
                                           .setSince("2019-11-01")\
                                           .setNear(city.get_coords())\
                                           .setWithin(city.get_radius())
        tweets = got.manager.TweetManager.getTweets(tweetCriteria)

        for tweet in tweets:
            data = self.create_tweet_json(tweet)
            tweet_list.append(data)
        return tweet_list

    def crawl(self, search_group):
        keyword = search_group.keyword
        city = search_group.city
        old_tweets = self.get_old_tweets(search_group)
        for old_tweet in old_tweets:
            existing_tweet = self.db.get(old_tweet["id_str"])
            if existing_tweet is None:
                old_tweet['_id'] = old_tweet["id_str"]
                old_tweet['sentiment_score'] = get_sentiment_score(old_tweet['text'])
                self.db.save(old_tweet)
            else:
                continue

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
