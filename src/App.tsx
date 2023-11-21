// App.tsx

import React, { useState } from 'react';
import './App.css';
import Plateau from './Components/Plateau';
import RoboticRover from './Components/RoboticRover';

function App() {
  const [roverData, setRoverData] = useState({
    id: '',
    direction: null as number | null,
    x: null as number | null,
    y: null as number | null,
    sizeX: null as number | null,
    sizeY: null as number | null,
    instructions: '',
  });
  
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
