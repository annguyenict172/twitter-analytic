import simplejson as json
from flask import Flask, make_response, jsonify
import redis
import sys

app = Flask(__name__)


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/popular_hashtags/<view>', methods=['GET'])
def get_hashtags(view):
    js = json.loads(r.get(view))
    return js


@app.route('/sentiment_scores/<view>', methods=['GET'])
def get_sentiments(view):
    js = json.loads(r.get(view))
    return js


@app.route('/lang/<view>', methods=['GET'])
def get_langs(view):
    js = json.loads(r.get(view))
    return js


@app.route('/job/<view>', methods=['GET'])
def get_jobs(view):
    js = json.loads(r.get(view))
    return js


app.config.update(
    DEBUG=True,
    REDIS_HOST='172.26.134.63',
    REDIS_PORT='6379'
)
r = redis.Redis(host=app.config.get('REDIS_HOST'), port=app.config.get('REDIS_PORT'), db=0)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
