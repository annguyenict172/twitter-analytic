# Import the necessary package to process data in JSON format
try:
    import json
except ImportError:
    import simplejson as json

# Import the tweepy library
import tweepy

# Import couchdb libarary
import couchdb

# Variables that contains the user credentials to access Twitter API
ACCESS_TOKEN = '928073905654206464-JhFJmnarVmjH46homsQo2u9eycIyVbg'
ACCESS_SECRET = 'dun2y9yu7kmWL6FRYjmyFQ0V7rMUqIvzBhCtenK96LbIQ'
CONSUMER_KEY = 'Ubm013jRNKfM4Ay8YbqILxUhQ'
CONSUMER_SECRET = 'DxuUqGazZRxGhD05vuXbqxiPTc21sLV7p0GmEWx4YWiW2Fb1OY'

COUCHDB_USER = 'icarus'
COUCHDB_PW = '4GSwX6czXaiZJFY'

# Setup tweepy to authenticate with Twitter credentials:

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create the api to connect to twitter with your creadentials
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)
# ---------------------------------------------------------------------------------------------------------------------
# wait_on_rate_limit= True;  will make the api to automatically wait for rate limits to replenish
# wait_on_rate_limit_notify= Ture;  will make the api  to print a notification when Tweepyis waiting for rate limits to replenish
# ---------------------------------------------------------------------------------------------------------------------

# This gets you a Server object, representing a CouchDB server. By default, it assumes CouchDB is running on localhost:5984.
server = couchdb.Server()

# Set credentials if necessary
server.resource.credentials = (COUCHDB_USER, COUCHDB_PW)

# create db if necessary
if "au" not in server:
    server.create("au")
db = server["au"]


class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        tweetJson = json.loads(status._json, encoding='utf-8')
        print(tweetJson)
        # exclude retweets
        if tweetJson["retweeted"] == False:
            db.save(tweetJson)

    def on_error(self, status_code):
        print(status_code)

if __name__ == "__main__":
    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)

    # Bounding box from https://gist.github.com/graydon/11198540
    myStream.filter(locations=(113.338953078, -43.6345972634, 153.569469029, -10.6681857235), is_async=True)

