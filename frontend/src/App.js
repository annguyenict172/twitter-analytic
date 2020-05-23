import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import DataVisualization from './component/DataVisualization';
import CitySelection from './component/CitySelection';
import ScenarioSelectio from './component/ScenarioSelection';

function App() {

  return (
    <GlobalProvider>
      <CitySelection />
      <ScenarioSelectio />
      <DataVisualization />
    </GlobalProvider>
  );
}

export default App;
