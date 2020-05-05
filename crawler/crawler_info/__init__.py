from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, create_engine
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()


class City(Base):
    __tablename__ = 'cities'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    radius = Column(Integer)

    def to_geocode_parameter(self):
        return '{},{},{}km'.format(self.lat, self.lng, self.radius)
   
    def get_coords(self):
        return '{} {}'.format(self.lat, self.lng)
    
    def get_radius(self):
        return '{}km'.format(self.radius)

class Keyword(Base):
    __tablename__ = 'keywords'

    id = Column(Integer, primary_key=True)
    text = Column(String)


class SearchGroup(Base):
    __tablename__ = 'search_groups'

    id = Column(Integer, primary_key=True)
    city_id = Column(Integer, ForeignKey('cities.id'))
    keyword_id = Column(Integer, ForeignKey('keywords.id'))
    max_id = Column(String)

    city = relationship("City")
    keyword = relationship("Keyword")


class TwitterAuthentication(Base):
    __tablename__ = 'twitter_authentications'

    id = Column(Integer, primary_key=True)
    consumer_key = Column(String)
    consumer_secret = Column(String)
    access_token = Column(String)
    access_token_secret = Column(String)
    exceed_limit_time = Column(DateTime)


engine = create_engine('sqlite:///crawler.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
