"""
Authors:
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

import time
from datetime import datetime

import tweepy

from crawler_info import session, CrawlerProgress, TwitterCredential
from config import Config
from base_crawler import BaseCrawler


class KeywordCrawler(BaseCrawler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.select_key_set()

    def select_key_set(self):
        auth_infos = session.query(TwitterCredential).filter_by(group_id=self.group.id).all()
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

    def crawl(self, city, keyword):
        progress = session.query(CrawlerProgress).filter_by(keyword_id=keyword.id, city_id=city.id).first()
        if not progress:
            progress = CrawlerProgress(keyword_id=keyword.id, city_id=city.id)

        if progress.max_id:
            tweets = self.api.search(q=keyword.text,count=Config.MAX_COUNT,result_type="recent",max_id=progress.max_id,
                                include_entities=True, geocode=city.to_geocode_parameter())
        else:
            tweets = self.api.search(q=keyword.text, count=Config.MAX_COUNT, result_type="recent",
                                include_entities=True, geocode=city.to_geocode_parameter())

        if not len(tweets):
            return

        info = {
            'city_name': city.name
        }
        self.save_tweets(tweets, info)

        # Update max_id
        progress.max_id = tweets[-1]._json["id_str"]
        session.add(progress)
        session.commit()

    def run(self):
        while True:
            cities, keywords = self.get_cities_and_keywords()
            for city in cities:
                for keyword in keywords:
                    while True:
                        try:
                            self.crawl(city, keyword)
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