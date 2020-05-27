"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

import simplejson as json


class PopularHashtags:
    def __init__(self):
        self.dict = {}
        self.dict_total = {}

    def add_hashtag(self, date, hashtag):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        if format_date in self.dict:
            if any(dictionary['hashtag'] == hashtag for dictionary in self.dict[format_date]):
                ind = next(i for i, dictionary in enumerate(self.dict[format_date]) if dictionary['hashtag'] == hashtag)
                self.dict[format_date][ind]['count'] += 1
            else:
                self.dict[format_date].append({'hashtag': hashtag, 'count': 1})
        else:
            self.dict[format_date] = [{'hashtag': hashtag, 'count': 1}]
        if hashtag in self.dict_total:
            self.dict_total[hashtag] += 1
        else:
            self.dict_total[hashtag] = 1

    def get_dict(self):
        for key1 in self.dict.keys():
            sorted_dict_list = sorted(self.dict[key1], key=lambda item: item['count'], reverse=True)
            rank_dict_list = []
            rank = 1
            for dict_item in sorted_dict_list:
                rank_dict_list.append({rank: dict_item})
                rank += 1
                if rank > 10:
                    break
            self.dict[key1] = rank_dict_list
        dict_str = json.dumps(self.dict)
        return dict_str

    def get_dict_total(self):
        sorted_dict_total = sorted(self.dict_total.items(), key=lambda item: item[1], reverse=True)
        rank_dict_total = []
        rank = 1
        for dict_item in sorted_dict_total:
            rank_dict_total.append({rank: dict_item})
            rank += 1
            if rank > 10:
                break
        dict_total_str = json.dumps(rank_dict_total)
        return dict_total_str
