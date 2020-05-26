import React from 'react';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import { LanguageCodeToLanguage, APIBaseURL } from '../constants';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { BtnBar } from './ToggleBar';

const Styles = styled.div`

  #btnbar, .container-fluid {
      padding-left: 0px;
      padding-right: 0px;
  }

  #citylbl {
    color: #6c757d;
    label-width: 100px;
    font-weight: 600;
    font-size: 1.50rem;
    width: 150px;
  }

  #drpdown {
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 20%;
    max-width: 20%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    appearance: none;
    background-color: #fff;
    
  }

  #tags {
    padding 0px 0px 30px 0px;
    margin-right: 0px;
    margin-left: 0px;
  }

  #covid {
    border-top: 5px solid #9FFFCB;
    padding 0px 20px 0px 20px;
    margin-right: 0px;
    margin-left: 0px;
  }

  h2 {
    display: flow-root;
    text-align: center;
    font-weight: 700;
    line-height: 1;
  }

  .row {
    display: flex;
    text-align: center;
    justify-content: center;

    flex-wrap: wrap;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height:50%;

  }
  
`;

class GraphPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    selectedCity: "Melbourne",
    sentimentCountData: null,
    covid19cases: null,
    jobTweetsData: null,
    covidTweetsData: null,
    topHashtagsData: null,
    topLanguagesData: null,
    isShowing: true
  }
  
  handleCityChange = (event) => {
    
    this.setState({ selectedCity: event.target.value }, () => {
      this.getData();
    });
  }

  handleClick() {
    this.setState(state => ({
      isShowing: !state.isShowing
    }));
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
          if(item.key === 'May 08') {
            const missingDates = ['May 09', 'May 10', 'May 11', 'May 12', 'May 13']
            missingDates.forEach(date => {
              chartData.labels.push(date);
              chartData['Fin Tweets'].data.push(0);
            })         
          }
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
      topLanguagesData,
      isShowing 
    } = this.state;

    return (
      <Styles>
        <Container fluid>
          <div style={{ textAlign: 'center', padding: '20px 60px' }}> 
          <div>
            <label id="citylbl">City: </label>
            <select id="drpdown" value={selectedCity} onChange={this.handleCityChange}>
              <option value="Melbourne">Melbourne</option>
              <option value="Sydney">Sydney</option>
              <option value="Canberra">Canberra</option>
              <option value="Perth">Perth</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Adelaide">Adelaide</option>
            </select>
            </div>
          </div>
          <section id="tags">
            <h2>Top Hashtags and Languages Graphs</h2>
            <Row>
             { topHashtagsData && 
                <BarGraph
                  data={topHashtagsData}
                  caption={'Top Hashtags'} 
                />
              }
            </Row>
            <Row>
            { topLanguagesData && 
                <BarGraph
                  data={topLanguagesData}
                  caption={'Top Foreign Languages'} 
                />
              }
            </Row>
          </section>
          <section id="covid">
            <h2 style={{paddingTop:"40px"}}>Covid-19 Graphs</h2>
            <Row>
              { covid19cases && 
                <LineGraph 
                  data={covid19cases}
                  caption={'Number of Covid-19 cases'}
                />
              }
            </Row>
            <Row>
              { covidTweetsData && 
                <LineGraph 
                  data={covidTweetsData}
                  caption={'Number of Covid-19 related tweets'}
                />
              }
            </Row>
            <Row>
              { sentimentCountData && 
                <LineGraph 
                  data={sentimentCountData}
                  caption={'Number of Positive and Negative tweets in total'}
                />
              }
            </Row>
            <Row>
              { jobTweetsData && 
                <LineGraph 
                  data={jobTweetsData}
                  caption={'Number of Financial Hardship related tweets'}
                />
              }
            </Row>
        </section>
        </Container>
      </Styles>
    
      
    );
  }
}

export default GraphPage;