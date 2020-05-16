import simplejson as json


class SentimentScores:
    def __init__(self):
        self.dict = {}

    def add_daily_sentiment(self, date,  score):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        if score < 0:
            if format_date in self.dict:
                self.dict[format_date] += 1
            else:
                self.dict[format_date] = 1

    def get_dict(self):
        dict_str = json.dumps(self.dict)
        return dict_str
