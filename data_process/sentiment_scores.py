"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

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
