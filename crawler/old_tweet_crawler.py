import traceback
from datetime import datetime, timedelta

import GetOldTweets3 as got

from config import Config
from crawler_info import session, CrawlerProgress
from base_crawler import BaseCrawler


def get_start_date():
    return datetime(2020, 1, 15)


def get_end_date():
    return datetime(2020, 4, 24)


class OldTweetCrawler(BaseCrawler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def create_tweet_json(self, tweet):
        tweet_data = {}
        tweet_data['_id'] = tweet.id
        tweet_data['id_str'] = str(tweet.id)
        tweet_data['username'] = tweet.username
        tweet_data['text'] = tweet.text
        tweet_data['hashtags'] = tweet.hashtags
        tweet_data['geo'] = tweet.geo
        return tweet_data

    def get_old_tweets(self, city, keyword):
        tweet_list = []

        progress = session.query(CrawlerProgress).filter_by(keyword_id=keyword.id, city_id=city.id).first()
        if not progress:
            progress = CrawlerProgress(keyword_id=keyword.id, city_id=city.id)

        since_date = progress.last_crawl_date
        if since_date is None:
            progress.last_crawl_date = since_date = get_start_date()
        until_date = since_date + timedelta(days=1)

        tweet_criteria = got.manager.TweetCriteria()\
                                           .setSince(since_date.strftime("%Y-%m-%d"))\
                                           .setUntil(until_date.strftime("%Y-%m-%d"))\
                                           .setNear(city.get_coords())\
                                           .setWithin(city.get_radius())\
                                           .setMaxTweets(int(Config.MAX_TWEETS))
        if keyword.text != '*':
            tweet_criteria.setQuerySearch(keyword.text)

        tweets = got.manager.TweetManager.getTweets(tweet_criteria)

        for tweet in tweets:
            data = self.create_tweet_json(tweet)
            tweet_list.append(data)

        # Update last crawl date
        progress.last_crawl_date = until_date
        session.add(progress)
        session.commit()

        return tweet_list

    def crawl(self, city, keyword):
        old_tweets = self.get_old_tweets(city, keyword)
        if len(old_tweets) > 0:
            info = {
                'city_name': city.name
            }
            self.save_tweets(old_tweets, info)

    def run(self):
        while True:
            cities, keywords = self.get_cities_and_keywords()
            for city in cities:
                for keyword in keywords:
                    try:
                        self.crawl(city, keyword)
                    except Exception as e:
                        traceback.print_exc()
                        continue