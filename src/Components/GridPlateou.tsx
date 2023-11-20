import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const GridPlateou = ({ roverData }: { roverData: { direction: number; x: number; y: number } }) => {
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const [internalDirection, setInternalDirection] = useState(0);

  useEffect(() => {
    const initialChartData = Array.from({ length: 10 }, (_, yIndex) =>
      Array.from({ length: 20 }, (_, xIndex) => ({ x: xIndex + 1, y: 10 - yIndex }))
    ).flat();

    setChartData((prevChartData) => [...initialChartData, { x: roverData.x, y: roverData.y }]);
    setInternalDirection(roverData.direction);
  }, [roverData]);


  console.log(internalDirection, 'internalDirection')
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Rover's Plateou",
        data: chartData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'triangle',
        radius: 20,
        pointRotation: internalDirection, 
      },
    ],
  };
  

  return (
    <div className='plateou'>
      <Scatter options={options} data={data} />
    </div>
  );
};

export default GridPlateou;
