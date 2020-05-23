import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import '../style/App.css'; 

function DataVisualization() {
  const { view } = useContext(GlobalContext);
  const [json, setJson] = useState(0);

  useEffect(() => {
    fetch(view.url).then(res=>res.json()).then(data=>{
      setJson(data);
    })
  });

  return (
    <div className="App">
      <header className="App-header">
      { view.city }
      { Object.keys(json) }
      </header>
    </div>
  );
}

export default DataVisualization;