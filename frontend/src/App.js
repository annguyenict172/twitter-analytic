import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import DataVisualization from './component/DataVisualization';
import CitySelection from './component/CitySelection';
import ScenarioSelection from './component/ScenarioSelection';
import DateSelection from './component/DateSelection';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <GlobalProvider>
          <div className="Navigation-bar">
            <DateSelection />
            <ScenarioSelection />
            <CitySelection />
          </div>
          <DataVisualization />
        </GlobalProvider>
      </header>
    </div>
  );
}

export default App;
