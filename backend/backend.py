import simplejson
from flask import Flask, g, request, make_response, jsonify
from couchdb.design import ViewDefinition
import flaskext.couchdb
import sys

app = Flask(__name__)


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


"""
CouchDB permanent view
Get all the locations in the user profile in the db
"""
users = ViewDefinition('design', 'users',
                            'function(doc) {emit(doc.user.id, doc.user.location);}')


@app.route('/melb_users', methods = ['GET'])
def get_users():
    docs = []
    for row in users(g.couch):
        docs.append(row.value)
    return simplejson.dumps(docs)


app.config.update(
    DEBUG=True,
    COUCHDB_SERVER='http://172.26.130.82:5984/',
    COUCHDB_DATABASE='tweets',
    COUCHDB_USERNAME='admin',
    COUCHDB_PASSWORD='password'
)
manager = flaskext.couchdb.CouchDBManager()
manager.setup(app)
manager.add_viewdef(users)  # Install the view
manager.sync(app)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
