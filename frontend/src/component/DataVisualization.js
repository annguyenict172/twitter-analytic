import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import GoogleApiWrapper from './map';
import '../style/App.css'; 

function DataVisualization() {
  const { view } = useContext(GlobalContext);
  const [json, setJson] = useState(0);

  useEffect(() => {
    fetch(view.url).then(res=>res.json()).then(data=>{
      setJson(data);
    })
  }, [view]);

  return (
    <div className="App">
      <header className="App-header">
      { JSON.stringify(json[view.date]) }
      <GoogleApiWrapper />
      </header>
    </div>
  );
}

export default DataVisualization;