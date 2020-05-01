import os

from dotenv import load_dotenv
load_dotenv()

class Config:
    SERVER_URL = os.getenv("COUCHDB_URL") or 'http://localhost:5984'
    DB_USER = os.getenv("COUCHDB_USER") or 'admin'
    DB_PASSWD = os.getenv("COUCHDB_PASSWORD") or 'password'
    DB = os.getenv("DB_NAME") or 'keywordtweetsdb'
    MAX_COUNT = 100
