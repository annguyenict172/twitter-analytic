import time
import couchdb
from config import Config
from views import Views
from popular_hashtags import PopularHashtags
from sentiment_scores import SentimentScores
from langs import Langs
import redis
import logging
import logging.handlers


class DataProcessor(object):
    def __init__(self):
        self.connect_to_couchdb()
        self.connect_to_redis()
        self.logger = logging.getLogger()
        self.logger.addHandler(logging.handlers.SMTPHandler(
            mailhost=("smtp.gmail.com", 587),
            fromaddr="pubacc4ccc987@gmail.com",
            toaddrs="icaruscys123@gmail.com",
            subject="DATA PROCESSING EXCEPTION",
            credentials=('pubacc4ccc987@gmail.com', '@Pubacc4ccc987'),
            secure=()))

    def connect_to_couchdb(self):
        server = couchdb.Server(Config.COUCHDB_SERVER)
        server.resource.credentials = (Config.COUCHDB_USERNAME, Config.COUCHDB_PASSWORD)
        try:
            self.db = server.create(Config.COUCHDB_DATABASE)
        except couchdb.http.PreconditionFailed:
            self.db = server[Config.COUCHDB_DATABASE]
        try:
            self.job_db = server.create(Config.COUCHDB_JOB_DATABASE)
        except couchdb.http.PreconditionFailed:
            self.job_db = server[Config.COUCHDB_JOB_DATABASE]

    def connect_to_redis(self):
        self.r = redis.Redis(host=Config.REDIS_HOST, port=Config.REDIS_PORT, db=0)

    def run(self):
        while True:
            try:
                """
                for popular_hashtag in Views.POPULAR_HASHTAGS:
                    popular_hashtags = PopularHashtags()
                    for item in self.db.view('popular_hashtags/'+popular_hashtag):
                        popular_hashtags.add_hashtag(item.key, item.value)
                    self.r.set(popular_hashtag, popular_hashtags.get_dict())
                for sentiment_score in Views.SENTIMENT_SCORES:
                    sentiment_scores = SentimentScores()
                    for item in self.db.view('sentiment_scores/'+sentiment_score):
                        sentiment_scores.add_daily_sentiment(item.key, item.value)
                    self.r.set(sentiment_score, sentiment_scores.get_dict())
                """
                for lang in Views.LANG:
                    langs = Langs()
                    for item in self.db.view('lang/'+lang):
                        langs.add_lang(item.key, item.value)
                    self.r.set(lang, langs.get_dict())
                    print(self.r.get(lang))
                """
                for job in Views.JOB:
                    jobs = SentimentScores()
                    for item in self.job_db.view('sentiment_scores/'+job):
                        jobs.add_daily_sentiment(item.key, item.value)
                    self.r.set(job, jobs.get_dict())
                """
                time.sleep(1200)
            except Exception as e:
                logging.exception(e)


if __name__ == '__main__':
    dp = DataProcessor()
    dp.run()
