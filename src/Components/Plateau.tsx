import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface PlateauProps {
  roverData: { id: string; direction: number; x: number; y: number; sizeX: number; sizeY: number; instructions: string };
  colorMap: string[]; 
}

const Plateau = ({ roverData, colorMap }: PlateauProps) => {
  const [rovers, setRovers] = useState<{ id: string; x: number; y: number; direction: number }[]>([]);

  useEffect(() => {
    if (
      roverData.id !== undefined &&
      roverData.x !== undefined &&
      roverData.y !== undefined &&
      roverData.direction !== undefined &&
      roverData.sizeX !== undefined &&
      roverData.sizeY !== undefined
    ) {
      setRovers((prevRovers) => [
        ...prevRovers,
        { id: roverData.id, x: roverData.x, y: roverData.y, direction: roverData.direction },
      ]);

      setRovers((prevRovers) => {
        const uniqueRovers = Array.from(new Set(prevRovers.map((rover) => rover.id)));
        if (uniqueRovers.length > 10) {
          return prevRovers.filter((rover) => rover.id !== uniqueRovers[0]);
        } else {
          return prevRovers;
        }
      });
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

  const pointData = {
    datasets: rovers.map((rover, index) => {
      const color = colorMap[index % colorMap.length]; 
      return {
        label: '',
        data: [{ x: rover.x, y: rover.y }],
        backgroundColor: color, 
        pointStyle: 'triangle',
        radius: 20,
        pointRotation: rover.direction,
        key: rover.id,
      };
    }),
  };

  return (
    <div className='plateau'>
      <Scatter options={options} data={{ datasets: pointData.datasets }} />
    </div>
  );
};

export default Plateau;
