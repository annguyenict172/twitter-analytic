import simplejson as json


class Langs:
    def __init__(self):
        self.dict = {}

    def add_lang(self, date, pair):
        date_list = date.split()
        format_date = date_list[1] + " " + date_list[2]
        lang = pair[0]
        sentiment = pair[1]
        if format_date in self.dict:
            if lang in self.dict[format_date].keys():
                self.dict[format_date][lang]['count'] += 1
                if sentiment > 0:
                    self.dict[format_date][lang]['positive'] += 1
                elif sentiment < 0:
                    self.dict[format_date][lang]['negative'] += 1
            else:
                new_dict = {'count': 1, 'negative': 0, "positive": 0}
                if sentiment > 0:
                    new_dict['positive'] += 1
                elif sentiment < 0:
                    new_dict['negative'] += 1
                self.dict[format_date][lang] = new_dict
        else:
            new_dict = {'count': 1, 'negative': 0, "positive": 0}
            if sentiment > 0:
                new_dict['positive'] += 1
            elif sentiment < 0:
                new_dict['negative'] += 1
            self.dict[format_date] = {lang: new_dict}

    def get_dict(self):
        dict_str = json.dumps(self.dict)
        return dict_str
