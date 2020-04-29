import tweepy
import json
import couchdb
import sys
from datetime import datetime


SERVER_URL = 'http://localhost:5984'    
DB_USER = 'admin'
DB_PASSWD = 'password'
DB = 'tweetutilsdb'

CONSUMER_KEY = 'zmJe5xFRii41GIdxDYYaOsjZC'
CONSUMER_SECRET = '6RYL2AxGE98zo43JpGcutkPdYVj7mhvdYd5UABIjgW4AcNazFH'
ACCESS_TOKEN = '63619142-O4vM3YAWHCzRaCS0FKOZPr2Xcl6qPoyQx0fJgINsn'
ACCESS_TOKEN_SECRET = 'j25nnkC57sCY7Fasm9k78YNcaIKmvoTTXOwf4w39IVbK7'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

filter_terms = ['covid19', 'coronavirus', 'quarantine2020', 'stayhome', 'quarantine', 'self isolation']

try:
    server = couchdb.Server(SERVER_URL)
    server.resource.credentials = (DB_USER, DB_PASSWD)
    print("Connected to server")
except:
    print("Cannot find CouchDB Server ... Exiting\n")
    print("----_Stack Trace_-----\n")
    raise

try:
    db = server.create(DB) 
    print("Created new database ", db)
except couchdb.http.PreconditionFailed:
    db = server[DB]
    print("Server database exists. Writing to ", db)


class StreamListener(tweepy.StreamListener):
    def __init__(self, db):
        self.db = db
        self.tweet_count = 0

    def on_connect(self):
        print("Connected to the Twitter API")
    
    def on_status(self, status):
        print(status.text, file=self.output_file)
    
    def on_error(self, status_code):
        if status_code != 200:
            print("Error: disconnecting from the Twitter API")
            return False
    def on_timeout(self):
        print(sys.stderr, "Timeout...")
        return True
   
    def on_data(self, data):
        
        if data[0].isdigit():
            pass
        else:
            tweet_data = json.loads(data)
            db.save(tweet_data)
        return True


stream = tweepy.Stream(auth, StreamListener(DB), timeout=120) 
try:
    stream.filter(track=filter_terms)  
except Exception as e:
    print (sys.stderr, "Error: '%s' '%s'" % (str(datetime.now()), str(e)))
except KeyboardInterrupt:
    print("Stopped")
finally:
    print (sys.stderr, "disconnecting...")
    stream.disconnect()
      