import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import DataVisualization from './component/DataVisualization';

function App() {

  return (
    <GlobalProvider>
      <DataVisualization />
    </GlobalProvider>
  );
}

export default App;
