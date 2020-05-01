from auth2 import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET
import json
import os
import sys
from datetime import datetime
import time
from time import sleep

from collections import OrderedDict 


from dotenv import load_dotenv
import couchdb
import tweepy
load_dotenv()


SERVER_URL = os.getenv("COUCHDB_URL") or 'http://localhost:5984'
DB_USER = os.getenv("COUCHDB_USER") or 'admin'
DB_PASSWD = os.getenv("COUCHDB_PASSWORD") or 'password'
DB = os.getenv("DB_NAME") or 'keywordtweetsdb'

MAX_COUNT = 100
AUS_GEO_CODE = [112.46,-44.37,153.53,-10.62]


auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

filter_terms = []
aus_cities = []

with open ("keywords.txt", encoding='utf8') as file:
    for line in file:
        line = line.strip()
        line = '#'+ line.lower()
        filter_terms.append(line)

with open ("auscities.txt", encoding='utf8') as file:
    for line in file:
        line = line.strip()
        line = line.split('-')
        tup = (line[0].strip(), line[1].strip())
        aus_cities.append(tup)

cities_coords = OrderedDict(aus_cities)

try:
    server = couchdb.Server(SERVER_URL)
    server.resource.credentials = (DB_USER, DB_PASSWD)
   
except:
    print("Cannot access database ", DB)

try:
    db = server.create(DB) 
    print("Created new database ", db)
except couchdb.http.PreconditionFailed:
    db = server[DB]
    print("Server database exists. Writing to ", db)

def crawl(keywords):
    while True:
        for word in keywords:
            for coords in cities_coords.values():
                print("Crawling Twitter for ", word)
            # can add geolocation here but tried it and got no results so got rid of it for the moment
                try:
                    for tweet in tweepy.Cursor(api.search,q=word,count=MAX_COUNT,result_type="recent",include_entities=True, geocode=coords).items():
                        try:
                            tweet_data = tweet._json
                            if not tweet_data["retweeted"]:
                                existing_tweet = db.get(tweet_data["id_str"])
                                if existing_tweet is None:
                                    tweet_data['_id'] = tweet_data["id_str"]
                                    db.save(tweet_data)
                                else:
                                    print ("Tweet already in database") 
                        except Exception as e:
                            print("Error loading tweet ", e)
                except Exception as e:
                    break
                    # print(e)
            

        print("Will search API again in 5 minutes")
        sleep(300)
    

crawl(filter_terms)