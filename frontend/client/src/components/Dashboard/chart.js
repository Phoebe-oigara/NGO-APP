{/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Make an HTTP GET request to the Flask API endpoint /line-chart
    axios.get('/line-chart').then((response) => {
      // Once data is fetched, set the chartData state with the response data
      setChartData(response.data);
    });
  }, []);

  return (
    <div>
      {chartData ? (
        <Line options={chartData.options} data={chartData.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LineChart;
*/}
