import simplejson as json


class SentimentScores:
    def __init__(self):
        self.dict = {}

    def add_daily_sentiment(self, date,  sentiment):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        if format_date in self.dict:
            if sentiment > 0:
                self.dict[format_date]['positive'] += 1
            elif sentiment < 0:
                self.dict[format_date]['negative'] += 1
        else:
            new_dict = {'negative': 0, "positive": 0}
            if sentiment > 0:
                new_dict['positive'] += 1
            elif sentiment < 0:
                new_dict['negative'] += 1
            self.dict[format_date] = new_dict

    def get_dict(self):
        dict_str = json.dumps(self.dict)
        return dict_str
