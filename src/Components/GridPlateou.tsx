import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

export function GridPlateou (){
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

 const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const roversRange = []
 const data = {
  datasets: [
    {
      label: "Rover's Plateou",
      data: [{x:10, y:6}, {x:2, y:3}, {x:12, y:11}],
      backgroundColor: 'rgba(255, 99, 132, 1)',
      pointStyle: "triangle",
      radius:20
      

    },
  ],
};

return <Scatter options={options} data={data} />

}
export default GridPlateou