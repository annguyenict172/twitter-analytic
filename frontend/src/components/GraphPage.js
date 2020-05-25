import React from 'react';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';

class GraphPage extends React.Component {
  state = {
    selectedCity: "Melbourne",
    sentimentCountData: null,
    covid19cases: null,
    jobTweetsData: null,
    covidTweetsData: null
  }
  
  handleCityChange = (event) => {
    this.setState({ selectedCity: event.target.value }, () => {
      this.getData();
    });
  }

  getJobTweetsCount = () => {
    const { selectedCity } = this.state;
    const url = `/job-tweets-count/${selectedCity.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let chartData = {
          labels: [],
          'Job Tweets': {
            color: '#d7505d',
            data: []
          }
        }
        data.forEach(item => {
          chartData.labels.push(item.key);
          chartData['Job Tweets'].data.push(item.value);
        })
        this.setState({ jobTweetsData: chartData });
      });
  }

  getCovidTweets = () => {
    const { selectedCity } = this.state;
    const url = `/covid-tweets-count/${selectedCity.toLowerCase()}`;
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
          chartData.labels.push(item.key);
          chartData['Covid-19 Tweets'].data.push(item.value);
        })
        this.setState({ covidTweetsData: chartData });
      });
  }

  getCovid19Cases = () => {
    const { selectedCity } = this.state;
    const url = `/covid-cases/${selectedCity.toLowerCase()}`;
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
    const url = `/sentiment_scores/${selectedCity.toLowerCase()}_sentiment_scores`;
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
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { selectedCity, sentimentCountData, covid19cases, jobTweetsData, covidTweetsData } = this.state;
    return (
      <div>
        <div>
          <select value={selectedCity} onChange={this.handleCityChange}>
            <option value="Melbourne">Melbourne</option>
            <option value="Sydney">Sydney</option>
            <option value="Canberra">Canberra</option>
            <option value="Perth">Perth</option>
            <option value="Brisbane">Brisbane</option>
            <option value="Adelaide">Adelaide</option>
          </select>
        </div>
        {/* <section>
          <h2>Top hashtags and languages</h2>
          <BarGraph />
          <BarGraph />
        </section> */}
        <section>
          <h2>Covid-19</h2>
          <div style={{ display: 'flex' }}>
            { covid19cases && 
              <LineGraph 
                data={covid19cases}
                caption={'Number of Covid-19 cases'}
              />
            }
            { sentimentCountData && 
              <LineGraph 
                data={sentimentCountData}
                caption={'Number of positive and negative tweets'}
              />
            }
          </div>
          <div style={{ display: 'flex' }}>
            { jobTweetsData && 
              <LineGraph 
                data={jobTweetsData}
                caption={'Number of job loss related tweets'}
              />
            }
            { covidTweetsData && 
              <LineGraph 
                data={covidTweetsData}
                caption={'Number of Covid-19 related tweets'}
              />
            }
          </div>
        </section>
      </div>
    );
  }
}

export default GraphPage;