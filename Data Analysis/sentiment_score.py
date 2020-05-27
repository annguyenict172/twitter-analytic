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

def get_score(file):
     city = file.split('_')[0]
     data = []
     for line in open(file,"r"):
          data.append(line.strip( ).split( ))

     data = pd.DataFrame(data)
     data = data.iloc[:,[1,2,6]]
     data.columns = ['month','day','score']
     data['date'] = data[['month', 'day']].apply(lambda x: ''.join(x), axis=1)
     data['score'] = pd.DataFrame(data['score'], dtype=np.float)
     score = data.groupby(['date'], as_index=False)['score'].mean()
     score.to_csv(city)
     plt.plot(score['date'],score['score'])
     plt.xticks(rotation=90)
     plt.savefig(city+'.png')
     plt.close()

     print(city + ': '+ str(score['score'].mean()))

file_list = ['adelaide_sentiment_scores.txt','brisbane_sentiment_scores.txt', 'canberra_sentiment_scores.txt',
             'melbourne_sentiment_scores.txt','perth_sentiment_scores.txt','sydney_sentiment_scores.txt']

for file in file_list:
     get_score(file)
