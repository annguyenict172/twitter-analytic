import couchdb

from analyzer import get_sentiment_score
from config import Config


class BaseCrawler(object):
    def connect_to_couchdb(self):
        server = couchdb.Server(Config.SERVER_URL)
        server.resource.credentials = (Config.DB_USER, Config.DB_PASSWD)
        try:
            self.db = server.create(Config.DB)
        except couchdb.http.PreconditionFailed:
            self.db = server[Config.DB]

    def save_tweets(self, tweets):
        for tweet in tweets:
            try:
                tweet_data = tweet._json
            except:
                tweet_data = tweet

            try:
                existing_tweet = self.db.get(tweet_data["id_str"])
                if existing_tweet is None:
                    tweet_data['_id'] = tweet_data["id_str"]
                    tweet_data['sentiment_score'] = get_sentiment_score(tweet_data['text'])
                    self.db.save(tweet_data)
                else:
                    continue
            except Exception as e:
                print("Error loading tweet ", e)

    def crawl(self, search_group):
        raise NotImplementedError()

    def run(self):
        raise NotImplementedError()
