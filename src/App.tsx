// App.tsx

import React, { useState } from 'react';
import './App.css';
import Rover from './Components/Rover';
import UserData from './Components/UserData';

function App() {
  const [roverData, setRoverData] = useState({ direction: 0, x: 0, y: 0, instructions: '' });

  const handleSendData = (direction: number, x: number, y: number, instructions: string) => {
    setRoverData({ direction, x, y, instructions });
  };

  return (
    <>
      <div className="App">
        <div className='UserInfoRover'>
          <UserData onSendData={handleSendData} />
        </div>
        <Rover
          direction={roverData.direction}
          x={roverData.x}
          y={roverData.y}
          instructions={roverData.instructions}
        />
      </div>
    </>
  );
}

export default App;
