import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CasesPerDay extends Component {
  dailyCases= () => {
    return this.props.dates.map(datePoint => {
      return { label: datePoint.date, y: parseInt(datePoint.numTweets) };
    });
  };
  render() {
    const options = {
      title: {
        text: `Number of Daily Reported COVID Cases in Australia`
      },
      axisY: {
        title: "Number of Cases",
        includeZero: false,
    },
    axisX: {
        title: "Date",
        valueFormatString: "MMM"
    },
      data: [
        {
          type: "spline",
          dataPoints: this.dailyTweetTotal()
        }
      ]
    };

    return (
      <div className="casesPerDay">
        <CanvasJSChart
          options={options}
          // onRef = {ref => this.chart = ref}
        />
      </div>
    );
  }
}

export default CasesPerDay;
