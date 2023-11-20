// App.tsx

import React, { useState } from 'react';
import './App.css';
import UserData from './Components/UserData';
import GridPlateou from './Components/GridPlateou';

function App() {
  const [roverData, setRoverData] = useState({ direction: 0, x: 2, y: 4, instructions: '' });

  const handleSendData = (direction: number, x: number, y: number, instructions: string) => {
    setRoverData({ direction, x, y, instructions });
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
