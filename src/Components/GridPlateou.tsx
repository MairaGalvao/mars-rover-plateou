// GridPlateou.tsx

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface GridPlateouProps {
  roverData: { direction: number; x: number; y: number; sizeX: number; sizeY: number; instructions: string };
}

const GridPlateou = ({ roverData }: GridPlateouProps) => {
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const [internalDirection, setInternalDirection] = useState(0);

  useEffect(() => {
    if (
      roverData.x !== undefined &&
      roverData.y !== undefined &&
      roverData.direction !== undefined &&
      roverData.sizeX !== undefined &&
      roverData.sizeY !== undefined
    ) {
      setChartData((prevChartData) => [...prevChartData, { x: roverData.x, y: roverData.y }]);
      setInternalDirection(roverData.direction);
    }
  }, [roverData]);

  const options = {

    scales: {
      x: {
        min: 0,
        max: roverData.sizeX,
        step: 1.0,
        beginAtZero: true,
      },
      y: {
        min: 0,
        max: roverData.sizeY,
        step: 1.0,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
          display: false,
       } }
  };

  const data = {
    datasets: [
      {
        label: "",
        data: chartData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'triangle',
        radius: 20,
        pointRotation: internalDirection,
      },
    ],
  };

  return (
    <div className='plateau'>
      <Scatter options={options} data={data} />
    </div>
  );
};

export default GridPlateou;
