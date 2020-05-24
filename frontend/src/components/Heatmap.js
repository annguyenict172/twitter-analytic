import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapStyle, CityLocation } from '../constants';

class Heatmap extends Component {
  static defaultProps = {
    zoom: 10,
  };

  state = {
    center: CityLocation['Melbourne'],
    heatmapData: null,
    selectedCity: 'Melbourne',
    selectedType: 'all',
    selectedSegment: 'age'
  }

  handleCityChange = (event) => {
    this.setState({selectedCity: event.target.value});
  }

  handleTypeChange = (event) => {
    this.setState({selectedType: event.target.value});
  }

  handleSegmentChange = (event) => {
    this.setState({selectedSegment: event.target.value});
  }

  loadNewMap = () => {
    this.fetchHeatmapData();
    this.setGeoJSON();
  }

  fetchHeatmapData = () => {
    const { selectedCity, selectedType } = this.state;
    const url = `/geo/${selectedCity.toLowerCase()}?type=${selectedType}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          center: CityLocation[selectedCity],
          heatmapData: {    
            positions: data,
            options: {   
              radius: 20,   
              opacity: 1
            },
          }
        });
      })
  }

  setGeoJSON = () => {
    const { selectedCity, selectedSegment } = this.state;
    this.map.data.forEach(feature => {
      this.map.data.remove(feature);
    });
    if (selectedSegment === 'nothing') {
      return;
    }

    const url = `/geojson/${selectedCity.toLowerCase()}`;
    fetch(url)
      .then(response => response.json())
      .then(geoJsonData => {
        if (geoJsonData == null) return;

        this.map.data.addGeoJson(geoJsonData);
        this.map.data.setStyle(function(feature) {
          if (selectedSegment === 'age') {
            const medianAge = feature.getProperty('median_age');
            let color = "#fff";
            if (medianAge >= 33 && medianAge < 40) {
              color = "#909090";
            } else if (medianAge >= 40) {
              color = "#3e3e3e";
            }
            return {
              fillColor: color,
              strokeWeight: 1
            }
          } else {
            const medianIncome = feature.getProperty('median_income');
            let color = "#fff";
            if (medianIncome >= 1000 && medianIncome < 2000) {
              color = "#909090";
            } else if (medianIncome < 1000) {
              color = "#3e3e3e";
            }
            return {
              fillColor: color,
              strokeWeight: 1
            }
          }
        });
      })
  }

  componentDidMount() {
    this.fetchHeatmapData();
  }

  handleApiLoaded = (map, maps) => {
    this.map = map;
    this.setGeoJSON();
  }

  render() {
    const mapOptions = {
      styles: MapStyle
    };
    const { heatmapData, selectedCity, selectedSegment, selectedType } = this.state
    if (this.state.heatmapData === null) return  null;
    return (
      <div>
        <div className="heatmap-panel">
          <label>
            City:
            <select value={this.state.selectedCity} onChange={this.handleCityChange}>
              <option value="Melbourne">Melbourne</option>
              <option value="Sydney">Sydney</option>
              <option value="Canberra">Canberra</option>
              <option value="Perth">Perth</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Adelaide">Adelaide</option>
            </select>
          </label>
          <label>
            Show tweets with:
            <select value={this.state.selectedType} onChange={this.handleTypeChange}>
              <option value="all">All</option>
              <option value="positive">Positive Sentiment</option>
              <option value="negative">Negative Sentiment</option>
              <option value="lang">Foreign Language</option>
            </select>
          </label>
          <label>
            Segment area by:
            <select value={this.state.selectedSegment} onChange={this.handleSegmentChange}>
              <option value="age">Age</option>
              <option value="income">Income</option>
              <option value="nothing">Nothing</option>
            </select>
          </label>
          <button onClick={this.loadNewMap}>Go</button>
        </div>
        { selectedSegment !== 'nothing' && 
          <div className="legend">
            <div className="group-wrapper">
              <div className="group first-group"></div> 
              {selectedSegment === 'age' ? '0 - 33' : '> $2000'}
            </div>
            <div className="group-wrapper">
              <div className="group second-group"></div> 
              {selectedSegment === 'age' ? '33 - 42' : '$1000 - $2000'}
            </div>
            <div className="group-wrapper">
              <div className="group third-group"></div> 
              {selectedSegment === 'age' ? '> 42' : '$0 - $1000'}
            </div>
          </div>
        }
        <div style={{ height: '88vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyD97oTvpo6whJ9Ev4fbLYJEeU7V74dFCDM' }}
            center={this.state.center}
            defaultZoom={this.props.zoom}
            heatmapLibrary={true}          
            heatmap={this.state.heatmapData}
            options={mapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          >
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Heatmap;