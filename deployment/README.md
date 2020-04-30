## Deployment

### Dependencies

- Install openstacksdk: `pip install openstacksdk`
- Download OpenStack RC file from your cloud provider, put it to this folder and rename it to `openrc.sh`
- `.pem` file to ssh to your instances

### Guide

Run appropriate deployment script to build your target instance

- CouchDB instance: `sh deploy-couchdb.sh`
- Twitter Crawler instance: `sh deploy-crawler.sh`
- Analytic Server instance: `sh deploy-analytic-server.sh`
- Web Server instance: `deploy-web-server.sh`