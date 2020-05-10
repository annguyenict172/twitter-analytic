import redis

r = redis.Redis(host='172.26.134.63', port=6379, db=0)
r.set("test", "1")
r.set("test", "2")
for key in r.scan_iter():
    print(r.get(key))