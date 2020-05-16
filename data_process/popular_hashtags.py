import simplejson as json


class PopularHashtags:
    def __init__(self):
        self.dict = {}

    def add_hashtag(self, date, hashtag):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        if format_date in self.dict:
            if hashtag in self.dict[format_date]:
                self.dict[format_date][hashtag] += 1
            else:
                self.dict[format_date][hashtag] = 1
        else:
            self.dict[format_date] = {hashtag: 1}

    def get_dict(self):
        for key1 in self.dict.keys():
            sorted_dict = {k: v for k, v in sorted(self.dict[key1].items(), key=lambda item: item[1], reverse=True)}
            tuple_dict = {}
            count = 1
            for key2 in sorted_dict.keys():
                tuple_dict[count] = (key2, sorted_dict.get(key2))
                count += 1
            self.dict[key1] = tuple_dict
        dict_str = json.dumps(self.dict)
        return dict_str
