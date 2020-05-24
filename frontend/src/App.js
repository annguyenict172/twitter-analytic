import React from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LocationMap from './components/LocationMap';
import LocationGraph from './components/LocationGraph';
import TimeGraph from './components/TimeGraphs';

function App() {

  return (
    <React.Fragment>
      <Router>
        <LocationMap />
      </Router>
    </React.Fragment>
  );
}

export default App;
