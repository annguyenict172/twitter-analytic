const reducer = (state, action) => {
  switch (action.type) {
    case 'popular_hashtags': 
      switch (action.city) {
        case 'adelaide': return {url: '/popular_hashtags/adelaide_popular_hashtags'}
        case 'melbourne': return {url: '/popular_hashtags/melbourne_popular_hashtags'}
        case 'brisbane': return {url: '/popular_hashtags/brisbane_popular_hashtags'}
        case 'canberra': return {url: '/popular_hashtags/canberra_popular_hashtags'}
        case 'perth': return {url: '/popular_hashtags/perth_popular_hashtags'}
        case 'sydney': return {url: '/popular_hashtags/sydney_popular_hashtags'}
        default: return state;
      };
    case 'sentiment_scores': 
      switch (action.city) {
        case 'adelaide': return {url: '/sentiment_scores/adelaide_sentiment_scores'}
        case 'melbourne': return {url: '/sentiment_scores/melbourne_sentiment_scores'}
        case 'brisbane': return {url: '/sentiment_scores/brisbane_sentiment_scores'}
        case 'canberra': return {url: '/sentiment_scores/canberra_sentiment_scores'}
        case 'perth': return {url: '/sentiment_scores/perth_sentiment_scores'}
        case 'sydney': return {url: '/sentiment_scores/sydney_sentiment_scores'}
        default: return state;
      };
    case 'lang': 
      switch (action.city) {
        case 'adelaide': return {url: '/lang/adelaide_lang'}
        case 'melbourne': return {url: '/lang/melbourne_lang'}
        case 'brisbane': return {url: '/lang/brisbane_lang'}
        case 'canberra': return {url: '/lang/canberra_lang'}
        case 'perth': return {url: '/lang/perth_lang'}
        case 'sydney': return {url: '/lang/sydney_lang'}
        default: return state;
      };
    case 'job': 
      switch (action.city) {
        case 'adelaide': return {url: '/job/adelaide_job_sentiment_scores'}
        case 'melbourne': return {url: '/job/melbourne_job_sentiment_scores'}
        case 'brisbane': return {url: '/job/brisbane_job_sentiment_scores'}
        case 'canberra': return {url: '/job/canberra_job_sentiment_scores'}
        case 'perth': return {url: '/job/perth_job_sentiment_scores'}
        case 'sydney': return {url: '/job/sydney_job_sentiment_scores'}
        default: return state;
      }
    default: return state;
  }
};

export default reducer;
