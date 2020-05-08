import couchdb

from crawler_info import City, Keyword, session
from analyzer import get_sentiment_score
from config import Config


class BaseCrawler(object):
    def __init__(self, group, db_name):
        self.group = group
        self.db = self.connect_to_couchdb(db_name)

    def get_cities_and_keywords(self):
        cities = session.query(City).all()
        keywords = session.query(Keyword).filter_by(group_id=self.group.id)
        return cities, keywords

    def connect_to_couchdb(self, db_name):
        server = couchdb.Server(Config.SERVER_URL)
        server.resource.credentials = (Config.DB_USER, Config.DB_PASSWD)
        try:
            db = server.create(db_name)
        except couchdb.http.PreconditionFailed:
            db = server[db_name]
        return db

    def save_tweets(self, tweets, info):
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
                    if info:
                        for key, value in info.items():
                            tweet_data[key] = value
                    self.db.save(tweet_data)
                else:
                    continue
            except Exception as e:
                print("Error loading tweet ", e)

    def crawl(self, *args, **kwargs):
        raise NotImplementedError()

    def run(self):
        raise NotImplementedError()
