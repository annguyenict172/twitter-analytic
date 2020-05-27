"""
Team 09
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

import pandas as pd
import numpy as np

data = []
for line in open('hashtags2sentiment.txt', "r"):
    line = line.strip().split(',')
    d = line[1].split()
    a = [line[0],d[2],line[2:-1],line[-1]]
    n = len(a[2])
    for i in range(n):
        b = [line[0],d[2],line[2+i].lower(),line[-1]]
        data.append(b)

data = pd.DataFrame(data)
data.columns = ['city', 'date','hashtag','score']
data['score'] = pd.DataFrame(data['score'], dtype=np.float)
#city_hashtags = data.groupby(['city','hashtag']).agg({'score':['mean'],'hashtag':['count']}).reset_index()
#city_hashtags.columns = ['city', 'hashtag','mean','count']
#city_hashtags.sort_values(['city','count'],ascending=[1,0],inplace=True)
#hashtag_score=city_hashtags.groupby(['city']).head(10)
#hashtag_score.to_csv('hashtag_score.csv')
city_hashtags = data.groupby(['city','date','hashtag']).agg({'hashtag':['count'],'score':lambda x: (x>0).sum()}).reset_index()
city_hashtags.columns = ['city', 'date','hashtag','count','pos']
city_hashtags['neg']=city_hashtags['count']-city_hashtags['pos']
city_hashtags['neg%']=city_hashtags['neg']/city_hashtags['count']
#city_hashtags.sort_values(['city','date','count'],ascending=[1,1,0],inplace=True)
#hashtag_score=city_hashtags.groupby(['city','date']).head(10)

mean_hashtags = data.groupby(['city','date','hashtag']).agg({'hashtag':['count'],'score':['mean']}).reset_index()
mean_hashtags.columns = ['city', 'date','hashtag','count','mean']
mean_hashtags['neg'] = city_hashtags['neg']
mean_hashtags['neg%'] = city_hashtags['neg%']
mean_hashtags.sort_values(['city','date','count'],ascending=[1,1,0],inplace=True)
hashtag_score=mean_hashtags.groupby(['city','date']).head(10)
hashtag_score.to_csv('mean_result.csv')