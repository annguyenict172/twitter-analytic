"""
Authors:
Canh Ha An Nguyen 	1098402 	Melbourne
Ashleigh Armstrong 	1112426 	Melbourne
Yuanlong Zhang 		772312 	    Melbourne
Yinsong Chen 		945600	    Melbourne
Xiaofu Ning 		1033578	    Melbourne
"""

from textblob import TextBlob

def get_sentiment_score(text):
    blob = TextBlob(text)
    try:
        sentences_to_scores = [s.sentiment.polarity for s in blob.sentences]
        avg = sum(sentences_to_scores) / len(sentences_to_scores)
        return avg
    except:
        return 0
