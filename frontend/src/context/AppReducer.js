/* eslint-disable no-template-curly-in-string */
const reducer = (state, action) => {
  switch (action.type) {
    case 'popular_hashtags': return {city: state.city, scenario: action.type, url: `/popular_hashtags/${state.city}_popular_hashtags`}
    case 'sentiment_scores': return {city: state.city, scenario: action.type, url: `/sentiment_scores/${state.city}_sentiment_scores`}
    case 'lang': return {city: state.city, scenario: action.type, url: `/lang/${state.city}_lang`}
    case 'job': return {city: state.city, scenario: action.type, url: `/job/${state.city}_job`}
    case 'adelaide': 
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/adelaide_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/adelaide_${state.scenario}`}
      }
    case 'melbourne':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/melbourne_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/melbourne_${state.scenario}`}
      }
    case 'brisbane':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/brisbane_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/brisbane_${state.scenario}`}
      }
    case 'canberra':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/canberra_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/canberra_${state.scenario}`}
      }
    case 'perth':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/perth_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/perth_${state.scenario}`}
      }
    case 'sydney':
      switch (state.scenario) {
        case 'job': return {city: action.type, scenario: state.scenario, url: '/job/sydney_job_sentiment_scores'}
        default: return {city: action.type, scenario: state.scenario, url: `/${state.scenario}/sydney_${state.scenario}`}
      }
    default: return state;
  }
};

export default reducer;
