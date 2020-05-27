"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

class Config:
    COUCHDB_SERVER = 'http://172.26.130.82:5984'
    COUCHDB_DATABASE = 'all_tweets'
    COUCHDB_JOB_DATABASE = 'job_tweets'
    COUCHDB_COVID_DATABASE = 'tweets'
    COUCHDB_USERNAME = 'admin'
    COUCHDB_PASSWORD = 'password'
    REDIS_HOST = '172.26.134.63'
    REDIS_PORT = '6379'
