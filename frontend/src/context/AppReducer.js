/* eslint-disable no-template-curly-in-string */
const reducer = (state, action) => {
  switch (action.type) {
    case 'popular_hashtags': return {city: state.city, scenario: action.type, date: state.date, url: `/popular_hashtags/${state.city}_popular_hashtags`}
    case 'sentiment_scores': return {city: state.city, scenario: action.type, date: state.date, url: `/sentiment_scores/${state.city}_sentiment_scores`}
    case 'lang': return {city: state.city, scenario: action.type, date: state.date, url: `/lang/${state.city}_lang`}
    case 'job': return {city: state.city, scenario: action.type, date: state.date, url: `/job/${state.city}_job_sentiment_scores`}
    case 'adelaide': 
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/adelaide_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/adelaide_${state.scenario}`}
      }
    case 'melbourne':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/melbourne_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/melbourne_${state.scenario}`}
      }
    case 'brisbane':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/brisbane_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/brisbane_${state.scenario}`}
      }
    case 'canberra':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/canberra_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/canberra_${state.scenario}`}
      }
    case 'perth':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/perth_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/perth_${state.scenario}`}
      }
    case 'sydney':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, date: state.date, url: '/job/sydney_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, date: state.date, url: `/${state.scenario}/sydney_${state.scenario}`}
      }
    default: 
      return {city: state.city, scenario: state.scenario, date: action.type, url: state.url}
  }
};

export default reducer;
