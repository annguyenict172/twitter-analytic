from textblob import TextBlob

def get_sentiment_score(text):
    blob = TextBlob(text)
    try:
        sentences_to_scores = [s.sentiment.polarity for s in blob.sentences]
        avg = sum(sentences_to_scores) / len(sentences_to_scores)
        return avg
    except:
        return 0
