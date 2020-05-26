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
      <div style={{ display:"table-caption", alignItems:"flex-end", 
      width: "900px", height:"600px", textAlign: 'center', paddingTop:"10px"}}>
        {/* <h4 style= {{display:"block",paddingBottom: "10px" }}>{ caption }</h4> */}
        <Bar
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
                  labelString: caption,
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

export default BarGraph;