import tweepy
import json
import couchdb
import sys
from datetime import datetime
import time
from time import sleep


SERVER_URL = 'http://localhost:5984'    
DB_USER = 'admin'
DB_PASSWD = 'password'
DB = 'keywordtweetsdb'

CONSUMER_KEY = 'zmJe5xFRii41GIdxDYYaOsjZC'
CONSUMER_SECRET = '6RYL2AxGE98zo43JpGcutkPdYVj7mhvdYd5UABIjgW4AcNazFH'
ACCESS_TOKEN = '63619142-O4vM3YAWHCzRaCS0FKOZPr2Xcl6qPoyQx0fJgINsn'
ACCESS_TOKEN_SECRET = 'j25nnkC57sCY7Fasm9k78YNcaIKmvoTTXOwf4w39IVbK7'
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