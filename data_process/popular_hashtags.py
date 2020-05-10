import simplejson as json


class PopularHashtags:
    def __init__(self):
        self.dict = {}

    def add_hashtag(self, key, value):
        if key in self.dict:
            self.dict[key] += value
        else:
            self.dict[key] = value

    def get_dict(self):
        sorted_dict = {k: v for k, v in sorted(self.dict.items(), key=lambda item: item[1], reverse=True)}
        tuple_dict = {}
        count = 1
        for key in sorted_dict.keys():
            tuple_dict[count] = (key, sorted_dict.get(key))
            count += 1
        dict_str = json.dumps(tuple_dict)
        return dict_str
