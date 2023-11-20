import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface PlateauProps {
  roverData: { id: string; direction: number; x: number; y: number; sizeX: number; sizeY: number; instructions: string };
}

const getRandomColor = () => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

const Plateau = ({ roverData }: PlateauProps) => {
  const [chartData, setChartData] = useState<{ id: string; x: number; y: number; direction: number }[]>([]);
  const [internalDirection, setInternalDirection] = useState(0);

  useEffect(() => {
    if (
      roverData.id !== undefined &&
      roverData.x !== undefined &&
      roverData.y !== undefined &&
      roverData.direction !== undefined &&
      roverData.sizeX !== undefined &&
      roverData.sizeY !== undefined
    ) {
      setChartData((prevChartData) => [
        ...prevChartData,
        { id: roverData.id, x: roverData.x, y: roverData.y, direction: roverData.direction },
      ]);

      const uniqueRovers = Array.from(new Set(chartData.map((rover) => rover.id)));
      if (uniqueRovers.length > 10) {
        setChartData((prevChartData) => prevChartData.filter((rover) => rover.id !== uniqueRovers[0]));
      }

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
      },
    },
  };

  const data = {
    datasets: chartData.map((rover) => ({
      label: '',
      data: [{ x: rover.x, y: rover.y }],
      backgroundColor: getRandomColor(),
      pointStyle: 'triangle',
      radius: 20,
      pointRotation: rover.direction,
      key: rover.id,
    })),
  };

  return (
    <div className='plateau'>
      <Scatter options={options} data={data} />
    </div>
  );
};

export default Plateau;
