import simplejson as json


class PopularHashtags:
    def __init__(self):
        self.dict = {}

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

    def get_dict(self):
        for key1 in self.dict.keys():
            sorted_dict_list = sorted(self.dict[key1], key=lambda item: item['count'], reverse=True)
            rank_dict_list = []
            rank = 1
            for dict_item in sorted_dict_list:
                rank_dict_list.append({rank:dict_item})
                rank += 1
                if rank > 10:
                    break
            self.dict[key1] = rank_dict_list
        dict_str = json.dumps(self.dict)
        return dict_str
