import simplejson as json


class Langs:
    def __init__(self):
        self.dict = {}
        self.dict_total = {}

    def add_lang(self, date, pair):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        lang = pair[0]
        sentiment = pair[1]
        if format_date in self.dict:
            if any(dictionary['lang'] == lang for dictionary in self.dict[format_date]):
                ind = next(i for i, dictionary in enumerate(self.dict[format_date]) if dictionary['lang'] == lang)
                self.dict[format_date][ind]['count'] += 1
                if sentiment > 0:
                    self.dict[format_date][ind]['positive'] += 1
                elif sentiment < 0:
                    self.dict[format_date][ind]['negative'] += 1
            else:
                new_dict = {'lang': lang, 'count': 1, 'negative': 0, "positive": 0}
                if sentiment > 0:
                    new_dict['positive'] += 1
                elif sentiment < 0:
                    new_dict['negative'] += 1
                self.dict[format_date].append(new_dict)
        else:
            new_dict = {'lang': lang, 'count': 1, 'negative': 0, "positive": 0}
            if sentiment > 0:
                new_dict['positive'] += 1
            elif sentiment < 0:
                new_dict['negative'] += 1
            self.dict[format_date] = [new_dict]
        if lang in self.dict_total:
            self.dict_total[lang] += 1
        else:
            self.dict_total[lang] = 1

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
