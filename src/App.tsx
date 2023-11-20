// App.tsx

import React, { useState } from 'react';
import './App.css';
import Plateau from './Components/Plateau';
import RoboticRover from './Components/RoboticRover';

function App() {
  const [roverData, setRoverData] = useState({ id: '', direction: 0, x: 0, y: 0, sizeX: 0, sizeY: 0, instructions: '' });

  const handleSendData = (id: string, direction: number, x: number, y: number, sizeX: number, sizeY: number, instructions: string) => {
    setRoverData({ id, direction, x, y, sizeX, sizeY, instructions });
  };

  return (
    <>
      <div className='mainApp'>
        <RoboticRover onSendData={handleSendData} />
        <Plateau roverData={roverData} colorMap={['red', 'pink', 'blue', 'lightBlue']}  />
      </div>
    </>
  );
}

export default App;
