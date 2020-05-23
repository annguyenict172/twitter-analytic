import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import DataVisualization from './component/DataVisualization';
import CitySelection from './component/CitySelection';
import ScenarioSelection from './component/ScenarioSelection';
import DateSelection from './component/DateSelection';

function App() {

  return (
    <GlobalProvider>
      <CitySelection />
      <ScenarioSelection />
      <DateSelection />
      <DataVisualization />
    </GlobalProvider>
  );
}

export default App;
