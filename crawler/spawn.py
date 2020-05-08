import argparse

from crawler_info import SearchGroup, session
from keyword_crawler import KeywordCrawler
from old_tweet_crawler import OldTweetCrawler


parser = argparse.ArgumentParser()
parser.add_argument("-g", "--group", help="Specify the target group that you want crawl data from")
parser.add_argument("-d", "--database", help="The database name that you want to save tweets into")
parser.add_argument("-c", "--crawler", help="Specify the type of crawler that you want to run")
args = parser.parse_args()


# Search if Search Group exists
group = session.query(SearchGroup).filter_by(name=args.group).first()
if not group:
    raise Exception('Group does not exist')


crawlers = {
    'keyword': KeywordCrawler,
    'old': OldTweetCrawler
}

crawler_class = crawlers[args.crawler]
crawler = crawler_class(group=group, db_name=args.database)
crawler.run()
