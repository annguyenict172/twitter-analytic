import os
import json

from crawler_info import session, City, Keyword, SearchGroup, TwitterCredential

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def add_cities():
    with open(BASE_DIR + "/crawler_info/auscities.txt", encoding='utf8') as file:
        for line in file:
            line = line.strip().split(' ')
            city_name = line[0]
            lat = float(line[1])
            lng = float(line[2])
            radius = int(line[3])
            city = session.query(City).filter_by(name=city_name).first()
            if city is None:
                city = City(name=city_name, lat=lat, lng=lng, radius=radius)
                session.add(city)
        session.commit()


def add_groups_and_keywords():
    with open(BASE_DIR + "/crawler_info/keywords.json", encoding='utf8') as file:
        data = json.load(file)
        for group_name, keywords in data.items():
            group = session.query(SearchGroup).filter_by(name=group_name).first()
            if not group:
                group = SearchGroup(name=group_name)
                session.add(group)
                session.commit()
            for text in keywords:
                keyword = session.query(Keyword).filter_by(text=text, group_id=group.id).first()
                if not keyword:
                    keyword = Keyword(text=text, group_id=group.id)
                    session.add(keyword)
                    session.commit()


def add_twitter_credentials():
    with open(BASE_DIR + "/crawler_info/api_keys.txt") as file:
        for line in file:
            line = line.strip().split(' ')
            consumer_key = line[0]
            consumer_secret = line[1]
            access_token = line[2]
            access_token_secret = line[3]

            default_group = session.query(SearchGroup).filter_by(name="all").first()

            auth_info = session.query(TwitterCredential).filter_by(consumer_key=consumer_key).first()
            if auth_info is None:
                auth_info = TwitterCredential(consumer_key=consumer_key, consumer_secret=consumer_secret,
                                              access_token=access_token, access_token_secret=access_token_secret,
                                              group_id=default_group.id)
                session.add(auth_info)
        session.commit()


add_cities()
add_groups_and_keywords()
add_twitter_credentials()
