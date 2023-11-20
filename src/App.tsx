// App.tsx

import React, { useState } from 'react';
import './App.css';
import GridPlateou from './Components/GridPlateou';
import UserData from './Components/UserData';

function App() {
  const [roverData, setRoverData] = useState<{ direction: number; x: number; y: number; instructions: string } | null>(null);

  const handleSendData = (direction: number, x: number, y: number, instructions: string) => {
    setRoverData({ direction, x, y, instructions });
  };

  return (
    <>
      <div className='mainApp'>
        <UserData onSendData={handleSendData} />
        {roverData !== null && <GridPlateou roverData={roverData} />}
      </div>
    </>
  );
}

export default App;
