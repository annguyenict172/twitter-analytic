import React from 'react';
import { Bar } from 'react-chartjs-2';

const getSetting = () => {
  return {
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)'
  }
} 

class BarGraph extends React.Component {
  render() {
    const { data, caption } = this.props;
    let chartData = {
      datasets: [{}]
    };
    chartData.labels = data.labels;
    chartData.datasets[0] = {
      data: data.data,
      label: data.type,
      ...getSetting()
    }
    return (
      <div style={{ width: "600px", textAlign: 'center' }}>
        <Bar
          data={chartData}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
        <h6>{ caption }</h6>
      </div>
    );
  }
}

export default BarGraph;