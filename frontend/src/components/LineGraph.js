import React from 'react';
import { Line } from 'react-chartjs-2';

const getSetting = (color) => {
  return {
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
  }
};

class LineGraph extends React.Component {
  render() {
    const { data, caption } = this.props;
    let chartData = {
      datasets: []
    };
    chartData.labels = data.labels;
    Object.keys(data).forEach(key => {
      if (key == 'labels') return;
      chartData.datasets.push({
        label: key,
        data: data[key].data,
        ...getSetting(data[key].color)
      })
    })
    return (
      <div style={{ display:"table-caption", alignItems:"flex-end", 
      width: "800px", height:"500px", textAlign: 'center', paddingTop:"10px"}}>
        {/* <h4 style= {{display:"block",paddingBottom: "10px" }}>{ caption }</h4> */}
        <Line 
          data={chartData} 
          height={200}
          options={{ 
            maintainAspectRatio: false,
            title: {
              display: true,
              text: caption,
              fontSize: 30,
              fontFamily: "Helvetica"
            },
            legend: {
              labels: {
                fontSize:  15
              }
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Days",
                  fontSize:  20
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Count of Tweets",
                  fontSize:  20
                }
              }]
           }
          }}
        />
      </div>
    );
  }
}

export default LineGraph;