import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [json, setJson] = useState(0);

  useEffect(() => {
    fetch('/popular_hashtags/melbourne_popular_hashtags').then(res=>res.json()).then(data=>{
      setJson(data);
    })
  });

  return (
    <div className="App">
      <header className="App-header">
        {
          Object.keys(json)
        }
      </header>
    </div>
  );
}

export default App;
