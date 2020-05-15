import simplejson as json


class SentimentScores:
    def __init__(self):
        self.dict = {}

    def add_daily_sentiment(self, score,  date):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        if format_date in self.dict:
            self.dict[format_date] = (self.dict[format_date][0]+score, self.dict[format_date][1]+1)
        else:
            self.dict[format_date] = (score, 1)

    def get_dict(self):
        for key in self.dict.keys():
            self.dict[key] = self.dict[key][0]/self.dict[key][1]
        dict_str = json.dumps(self.dict)
        return dict_str
