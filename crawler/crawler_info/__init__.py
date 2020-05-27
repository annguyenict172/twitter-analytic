"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, Date, create_engine
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


class SearchGroup(Base):
    __tablename__ = 'search_groups'

    id = Column(Integer, primary_key=True)
    name = Column(String)


class Keyword(Base):
    __tablename__ = 'keywords'

    id = Column(Integer, primary_key=True)
    text = Column(String)

    group_id = Column(Integer, ForeignKey('search_groups.id'))
    group = relationship("SearchGroup")


class CrawlerProgress(Base):
    __tablename__ = 'crawler_progresses'

    id = Column(Integer, primary_key=True)
    city_id = Column(Integer, ForeignKey('cities.id'))
    keyword_id = Column(Integer, ForeignKey('keywords.id'))
    max_id = Column(String)
    last_crawl_date = Column(Date)

    city = relationship("City")
    keyword = relationship("Keyword")


class TwitterCredential(Base):
    __tablename__ = 'twitter_credentials'

    id = Column(Integer, primary_key=True)
    consumer_key = Column(String)
    consumer_secret = Column(String)
    access_token = Column(String)
    access_token_secret = Column(String)
    exceed_limit_time = Column(DateTime)

    group_id = Column(Integer, ForeignKey('search_groups.id'))
    group = relationship("SearchGroup")


engine = create_engine('sqlite:///crawler.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
