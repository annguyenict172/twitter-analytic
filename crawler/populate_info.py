from crawler_info import session, City, Keyword, SearchGroup, TwitterAuthentication


def add_cities():
    with open("crawler_info/auscities.txt", encoding='utf8') as file:
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

def add_keywords():
    with open("crawler_info/keywords.txt", encoding='utf8') as file:
        for line in file:
            line = line.strip().lower()
            keyword = session.query(Keyword).filter_by(text=line).first()
            if keyword is None:
                keyword = Keyword(text=line)
                session.add(keyword)
        session.commit()

def add_search_groups():
    cities = session.query(City).all()
    keywords = session.query(Keyword).all()
    for city in cities:
        for keyword in keywords:
            search_group = session.query(SearchGroup).filter_by(city_id=city.id, keyword_id=keyword.id).first()
            if search_group is None:
                search_group = SearchGroup(city_id=city.id, keyword_id=keyword.id)
                session.add(search_group)
    session.commit()

def add_twitter_authentication():
    with open("crawler_info/api_keys.txt") as file:
        for line in file:
            line = line.strip().split(' ')
            consumer_key = line[0]
            consumer_secret = line[1]
            access_token = line[2]
            access_token_secret = line[3]
            auth_info = session.query(TwitterAuthentication).filter_by(consumer_key=consumer_key).first()
            if auth_info is None:
                auth_info = TwitterAuthentication(consumer_key=consumer_key, consumer_secret=consumer_secret,
                                                  access_token=access_token, access_token_secret=access_token_secret)
                session.add(auth_info)
        session.commit()

add_cities()
add_keywords()
add_search_groups()
add_twitter_authentication()
