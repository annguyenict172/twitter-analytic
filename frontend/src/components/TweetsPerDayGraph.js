import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TweetsPerDay extends Component {
  dailyTweetTotal= () => {
    return this.props.tweetdata.map(datePoint => {
      return { label: datePoint.date, y: parseInt(datePoint.numTweets) };
    });
  };
  render() {
    const options = {
        animationEnabled: true,
        title: {
            text: `Number of COVID Tweets Collected Per Day`
        },
        axisY: {
            title: "Number of Tweets",
            includeZero: false,
        },
        axisX: {
            title: "Date",
            valueFormatString: "MMM"
        },
        data: [
            {
            type: "line",
            dataPoints: this.dailyTweetTotal()
            }
        ]
    };

    return (
      <div className="tweetPerDay">
        <CanvasJSChart
          options={options}
          // onRef = {ref => this.chart = ref}
        />
      </div>
    );
  }
}

export default TweetsPerDay;
