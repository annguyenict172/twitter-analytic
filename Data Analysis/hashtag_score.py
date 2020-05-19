import pandas as pd
import numpy as np

data = []
for line in open('hashtags2sentiment.txt', "r"):
    line = line.strip().split(',')
    a = [line[0],line[2:-1],line[-1]]
    n = len(a[1])
    for i in range(n):
        b = [line[0],line[2+i].lower(),line[-1]]
        data.append(b)

data = pd.DataFrame(data)
data.columns = ['city', 'hashtag','score']
data['score'] = pd.DataFrame(data['score'], dtype=np.float)
city_hashtags = data.groupby(['city','hashtag']).agg({'score':['mean'],'hashtag':['count']}).reset_index()
city_hashtags.columns = ['city', 'hashtag','mean','count']
city_hashtags.sort_values(['city','count'],ascending=[1,0],inplace=True)
hashtag_score=city_hashtags.groupby(['city']).head(10)
hashtag_score.to_csv('hashtag_score.csv')