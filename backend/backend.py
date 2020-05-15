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


@app.route('/popular_hashtags/<city>', methods=['GET'])
def get_hashtags(city):
    js = json.loads(r.get(city))
    return js


@app.route('/sentiment_scores/<city>', methods=['GET'])
def get_sentiments(city):
    js = json.loads(r.get(city))
    return js


app.config.update(
    DEBUG=True,
    REDIS_HOST='172.26.134.63',
    REDIS_PORT='6379'
)
r = redis.Redis(host=app.config.get('REDIS_HOST'), port=app.config.get('REDIS_PORT'), db=0)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
