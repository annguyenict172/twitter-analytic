import React from 'react';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import { LanguageCodeToLanguage, APIBaseURL } from '../constants';

class GraphPage extends React.Component {
  state = {
    selectedCity: "Melbourne",
    sentimentCountData: null,
    covid19cases: null,
    jobTweetsData: null,
    covidTweetsData: null,
    topHashtagsData: null,
    topLanguagesData: null
  }
  
  handleCityChange = (event) => {
    this.setState({ selectedCity: event.target.value }, () => {
      this.getData();
    });
  }

  getTopHashtags = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/popular_hashtags/${selectedCity.toLowerCase()}_popular_hashtags_total`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const chartData = {
          labels: [],
          data: [],
          type: 'Hashtag'
        }
        let counter = 1;
        data.forEach(item => {
          chartData.labels.push(item[counter][0]);
          chartData.data.push(item[counter][1]);
          counter++;
        })
        this.setState({ topHashtagsData: chartData })
      });
  }

  getTopLanguages = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/lang/${selectedCity.toLowerCase()}_lang_total`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const chartData = {
          labels: [],
          data: [],
          type: 'Language'
        }
        let counter = 1;
        data.forEach(item => {
          if (counter === 1) {
            counter++;
            return;
          }
          const language = LanguageCodeToLanguage[item[counter][0]] || {name: item[counter][0]}
          chartData.labels.push(language.name);
          chartData.data.push(item[counter][1]);
          counter++;
        })
        this.setState({ topLanguagesData: chartData })
      });
  }

  getJobTweetsCount = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/job-tweets-count/${selectedCity.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let chartData = {
          labels: [],
          'Fin Tweets': {
            color: '#d7505d',
            data: []
          }
        }
        data.forEach(item => {
          if (!item.key.includes('May')) return;
          chartData.labels.push(item.key);
          chartData['Fin Tweets'].data.push(item.value);
        })
        this.setState({ jobTweetsData: chartData });
      });
  }

  getCovidTweets = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/covid-tweets-count/${selectedCity.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let chartData = {
          labels: [],
          'Covid-19 Tweets': {
            color: '#d7505d',
            data: []
          }
        }
        data.forEach(item => {
          if (!item.key.includes('May')) return;
          chartData.labels.push(item.key);
          chartData['Covid-19 Tweets'].data.push(item.value);
        })
        this.setState({ covidTweetsData: chartData });
      });
  }

  getCovid19Cases = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/covid-cases/${selectedCity.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let chartData = {
          labels: data.labels,
          'Confirmed Cases': {
            color: '#d7505d',
            data: data.data
          },
        };
        this.setState({ covid19cases: chartData });
      });
  }

  getJobLossSentimentCount = () => {
    const { selectedCity } = this.state;
    const url = `${APIBaseURL}/sentiment_scores/${selectedCity.toLowerCase()}_sentiment_scores`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let chartData = {
          labels: [],
          negative: {
            color: '#d7505d',
            data: []
          },
          positive: {
            color: '#5085d7',
            data: []
          },
        };
        Object.keys(data).forEach(key => {
          if (!key.includes('May')) return;
          chartData.labels.push(key);
          chartData.negative.data.push(data[key].negative);
          chartData.positive.data.push(data[key].positive);
        })
        this.setState({ sentimentCountData: chartData });
      });
  }

  getData = () => {
    this.getJobLossSentimentCount();
    this.getCovid19Cases();
    this.getJobTweetsCount();
    this.getCovidTweets();
    this.getTopHashtags();
    this.getTopLanguages();
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { 
      selectedCity, 
      sentimentCountData, 
      covid19cases, 
      jobTweetsData, 
      covidTweetsData,
      topHashtagsData,
      topLanguagesData 
    } = this.state;

    return (
      <div style={{ textAlign: 'center', padding: '20px 80px' }}>
        <div>
          <label>City: </label>
          <select value={selectedCity} onChange={this.handleCityChange}>
            <option value="Melbourne">Melbourne</option>
            <option value="Sydney">Sydney</option>
            <option value="Canberra">Canberra</option>
            <option value="Perth">Perth</option>
            <option value="Brisbane">Brisbane</option>
            <option value="Adelaide">Adelaide</option>
          </select>
        </div>
        <section>
          <h2>Top hashtags and languages</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { topHashtagsData && 
              <BarGraph
                data={topHashtagsData}
                caption={'Top Hashtags'} 
              />
            }
            { topLanguagesData && 
              <BarGraph
                data={topLanguagesData}
                caption={'Top Foreign Languages'} 
              />
            }
          </div>
        </section>
        <section>
          <h2>Covid-19</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { covid19cases && 
              <LineGraph 
                data={covid19cases}
                caption={'Number of Covid-19 cases'}
              />
            }
            { covidTweetsData && 
              <LineGraph 
                data={covidTweetsData}
                caption={'Number of Covid-19 related tweets'}
              />
            }
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { sentimentCountData && 
              <LineGraph 
                data={sentimentCountData}
                caption={'Number of positive and negative tweets'}
              />
            }
            { jobTweetsData && 
              <LineGraph 
                data={jobTweetsData}
                caption={'Number of Financial Hardship related tweets'}
              />
            }
          </div>
        </section>
      </div>
    );
  }
}

export default GraphPage;