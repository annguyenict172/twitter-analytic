from datetime import datetime, timedelta

import GetOldTweets3 as got

from crawler_info import session, SearchGroup
from base_crawler import BaseCrawler


def get_start_date():
    return datetime(2020, 1, 1)


def get_end_date():
    return datetime(2020, 4, 24)


class OldTweetCrawler(BaseCrawler):
    def __init__(self):
        self.connect_to_couchdb()

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

        since_date = search_group.last_crawl_date
        if since_date is None:
            search_group.last_crawl_date = since_date = get_start_date()
        until_date = since_date + timedelta(days=1)

        tweet_criteria = got.manager.TweetCriteria().setQuerySearch(keyword)\
                                           .setSince(since_date.strftime("%Y-%m-%d"))\
                                           .setUntil(until_date.strftime("%Y-%m-%d"))\
                                           .setNear(city.get_coords())\
                                           .setWithin(city.get_radius())
        tweets = got.manager.TweetManager.getTweets(tweet_criteria)

        for tweet in tweets:
            data = self.create_tweet_json(tweet)
            tweet_list.append(data)
        return tweet_list

    def crawl(self, search_group):
        old_tweets = self.get_old_tweets(search_group)

        if len(old_tweets) > 0:
            self.save_tweets(old_tweets)

        next_crawl_date = search_group.last_crawl_date + timedelta(days=1)
        search_group.last_crawl_date = next_crawl_date
        session.add(search_group)
        session.commit()

    def run(self):
        while True:
            search_groups = session.query(SearchGroup).all()
            for search_group in search_groups:
                self.crawl(search_group)
            if search_groups[-1].next_crawl_date == get_end_date():
                print('Finish crawling old tweets')
                break


if __name__ == '__main__':
    crawler = OldTweetCrawler()
    crawler.run()
