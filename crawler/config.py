"""
Authors:
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

import os

from dotenv import load_dotenv
load_dotenv()


class Config:
    SERVER_URL = os.getenv("COUCHDB_URL") or 'http://localhost:5984'
    DB_USER = os.getenv("COUCHDB_USER") or 'admin'
    DB_PASSWD = os.getenv("COUCHDB_PASSWORD") or 'password'
    DB = os.getenv("DB_NAME") or 'keywordtweetsdb'
    MAX_COUNT = 100
    MAX_TWEETS = os.getenv("MAX_TWEETS") or 2000
