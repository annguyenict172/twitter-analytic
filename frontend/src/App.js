import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import DataVisualization from './component/DataVisualization';
import CitySelection from './component/CitySelection';

function App() {

  return (
    <GlobalProvider>
      <CitySelection />
      <DataVisualization />
    </GlobalProvider>
  );
}

export default App;
