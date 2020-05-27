"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

from datetime import timedelta
import simplejson as json
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
import redis
import requests
import sys

app = Flask(__name__)
CORS(app)

CITY_INDEX = {
    'sydney': 1,
    'melbourne': 2,
    'brisbane': 3,
    'adelaide': 4,
    'perth': 5,
    'canberra': 8
}

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/popular_hashtags/<view>', methods=['GET'])
def get_hashtags(view):
    js = json.loads(r.get(view))
    return jsonify(js)


@app.route('/sentiment_scores/<view>', methods=['GET'])
def get_sentiments(view):
    js = json.loads(r.get(view))
    return js


@app.route('/lang/<view>', methods=['GET'])
def get_langs(view):
    js = json.loads(r.get(view))
    return jsonify(js)


@app.route('/job/<view>', methods=['GET'])
def get_jobs(view):
    js = json.loads(r.get(view))
    return js


@app.route('/job-tweets-count/<city>', methods=['GET'])
def get_job_tweets_count(city):
    js = json.loads(r.get('job_{}_count_by_day'.format(city)))
    return jsonify(js)


@app.route('/covid-tweets-count/<city>', methods=['GET'])
def get_covid_tweets_count(city):
    js = json.loads(r.get('covid_{}_count_by_day'.format(city)))
    return jsonify(js)


@app.route('/geo/<city>', methods=['GET'])
def get_geo_of_tweets(city):
    query_type = request.args.get('type')
    if query_type is not None:
        if query_type == 'all':
            query_type = ''
        else:
            query_type = query_type + '_'
    city = city.lower()

    view_name = '{}_{}withgeo'.format(city, query_type)
    data = json.loads(r.get(view_name))
    data = list(map(lambda p: p['value'], data))
    return jsonify(data)


@app.route('/geojson/<city>', methods=['GET'])
def get_geo_json(city):
    js = json.loads(r.get('{}-geojson'.format(city)))
    return js

@app.route('/covid-cases/<city>', methods=['GET'])
def get_covid_cases(city):
    data = r.get("covidcases")
    if not data:
        res = requests.get('https://infogram.com/api/live/data/384447341/1589246671227/?force=1')
        data = res.json()['data'][0]
        r.setex(
            "covidcases",
            timedelta(hours=24),
            json.dumps(data)
        )
    else:
        data = json.loads(data)

    labels = []
    points = []
    for i in range(1, len(data)):
        row = data[i]
        if not row[0].endswith('/05'):
            continue
        labels.append(row[0])
        try:
            points.append(int(row[CITY_INDEX[city]]))
        except:
            points.append(0)
    return jsonify({
        'labels': labels,
        'data': points
    })


app.config.update(
    DEBUG=True,
    REDIS_HOST='172.26.134.63',
    REDIS_PORT='6379'
)
r = redis.Redis(host=app.config.get('REDIS_HOST'), port=app.config.get('REDIS_PORT'), db=0)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
