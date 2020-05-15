import time
import couchdb
from couchdb.design import ViewDefinition
from config import Config
from views import Views
from popular_hashtags import PopularHashtags
from  sentiment_scores import SentimentScores
import simplejson as json
import redis


class DataProcessor(object):
    def __init__(self):
        self.connect_to_couchdb()
        self.connect_to_redis()

    def connect_to_couchdb(self):
        server = couchdb.Server(Config.COUCHDB_SERVER)
        print("connect to server")
        server.resource.credentials = (Config.COUCHDB_USERNAME, Config.COUCHDB_PASSWORD)
        print("authentication")
        try:
            self.db = server.create(Config.COUCHDB_DATABASE)
            print("create db")
        except couchdb.http.PreconditionFailed:
            self.db = server[Config.COUCHDB_DATABASE]
            print("connect to db")

    def connect_to_redis(self):
        self.r = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT, db=0)
        print("connect to redis")

    def run(self):
        while True:
            for popular_hashtag in Views.POPULAR_HASHTAGS:
                popular_hashtags = PopularHashtags()
                for item in self.db.view('popular_hashtags/'+popular_hashtag):
                    popular_hashtags.add_hashtag(item.key, item.value)
                self.r.set(popular_hashtag, popular_hashtags.get_dict())
                print(self.r.get(popular_hashtag))
            for sentiment_score in Views.SENTIMENT_SCORES:
                sentiment_scores = SentimentScores()
                for item in self.db.view('sentiment_scores/'+sentiment_score):
                    sentiment_scores.add_daily_sentiment(item.key, item.value)
                self.r.set(sentiment_score, sentiment_scores.get_dict())
                print(self.r.get(sentiment_score))
            time.sleep(1200)


if __name__ == '__main__':
    dp = DataProcessor()
    dp.run()
