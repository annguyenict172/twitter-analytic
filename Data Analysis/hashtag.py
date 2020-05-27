"""
Authors:
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def get_hashtag(file):
    city = file.split('_')[0]
    data = []
    for line in open(file, "r"):
        line = line.strip().split()
        line[-1]=line[-1].lower()
        data.append(line)

    data = pd.DataFrame(data)
    data = data.iloc[:, [1, 2, 6]]
    data.columns = ['month', 'day', 'hashtag']
    data['date'] = data[['month', 'day']].apply(lambda x: ''.join(x), axis=1)
    data = data.iloc[:, [2, 3]]
    total_hashtags = data.groupby(['hashtag'])['hashtag'].count().nlargest(10)
    day_hashtags = data.groupby(['date', 'hashtag'])['hashtag'].count().groupby(level=0, group_keys=False).nlargest(
        10).reset_index(name='count')
    day_hashtags.to_csv(city+'_daily_hashtag.csv')

    print(city+': ')
    print(total_hashtags)

file_list = ['adelaide_popular_hashtags.txt','brisbane_popular_hashtags.txt', 'canberra_popular_hashtags.txt',
             'melbourne_popular_hashtags.txt','perth_popular_hashtags.txt','sydney_popular_hashtags.txt']

for file in file_list:
     get_hashtag(file)

