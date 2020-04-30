import json
import os
import sys
from datetime import datetime
import time
from time import sleep

from dotenv import load_dotenv
import couchdb
import tweepy
load_dotenv()


SERVER_URL = os.getenv("COUCHDB_URL") or 'http://localhost:5984'
DB_USER = os.getenv("COUCHDB_USER") or 'admin'
DB_PASSWD = os.getenv("COUCHDB_PASSWORD") or 'password'
DB = os.getenv("DB_NAME") or 'keywordtweetsdb'

CONSUMER_KEY = 'mMCz28c45vHW6XTdoBIHHhbl2'
CONSUMER_SECRET = 'uXw7nzujHDJessZopuitadgsePihe30koq9o06b68HAR3djrDK'
ACCESS_TOKEN = '928816616879546368-T2CjMsdM0XH9DG0a31utJh5CkJqHlYa'
ACCESS_TOKEN_SECRET = 'jXE98mirj8wzQMlzjSUt3VVQhAGUiooevpo1xuYO5aFaB'
MAX_COUNT = 100
AUS_GEO_CODE = [112.46,-44.37,153.53,-10.62]


auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

filter_terms = []

with open ("keywords.txt") as file:
    for line in file:
        line = line.strip()
        line = '#'+ line.lower()
        filter_terms.append(line)

try:
    server = couchdb.Server(SERVER_URL)
    server.resource.credentials = (DB_USER, DB_PASSWD)
   
except:
    print("Cannot access database ", db)

try:
    db = server.create(DB) 
    print("Created new database ", db)
except couchdb.http.PreconditionFailed:
    db = server[DB]
    print("Server database exists. Writing to ", db)

def crawl(keywords):
    while True:
        for word in keywords:
            print("Crawling Twitter for ", word)
            #can add geolocation here but tried it and got no results so got rid of it for the moment 
            tweets = api.search(word, include_entities=True, count=MAX_COUNT)
            if len(tweets) > 0:
                for tweet in tweets:
                    try:
                        tweet_data = tweet._json
                        existing_tweet = db.get(tweet_data["id_str"])
                        if existing_tweet is None:
                            tweet_data['_id'] = tweet_data["id_str"]
                            db.save(tweet_data)
                        else:
                            print ("Tweet already in database") 
                    except Exception as e:
                        print("Error loading tweet ", e)
            else:
                continue
        print("Will search API again in 5 minutes")
        sleep(300)


crawl(filter_terms)