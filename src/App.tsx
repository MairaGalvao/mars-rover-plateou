// App.tsx
import React, { useState } from 'react';
import './App.css';
import GridPlateou from './Components/GridPlateou';
import UserData from './Components/UserData';

function App() {
  const [roverData, setRoverData] = useState({ direction: 0, x: 0, y: 0, sizeX: 0, sizeY: 0, instructions: '' });

  const handleSendData = (direction: number, x: number, y: number, sizeX: number, sizeY: number, instructions: string) => {
    setRoverData({ direction, x, y, sizeX, sizeY, instructions });
  };

  return (
    <>
      <div className='mainApp'>
        <UserData onSendData={handleSendData} />
        <GridPlateou roverData={roverData} />
      </div>
    </>
  );
}

export default App;
