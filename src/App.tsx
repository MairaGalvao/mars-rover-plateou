// App.tsx

import React, { useState } from 'react';
import './App.css';
import Rover from './Components/Rover';
import UserData from './Components/UserData';
import GridPlateou from './Components/GridPlateou';

function App() {

  const [roverData, setRoverData] = useState({ direction: 0, x: 2, y: 4, instructions: '' });

  const handleSendData = (direction: number, x: number, y: number, instructions: string) => {
    setRoverData({ direction, x, y, instructions });
  };




  return (
    <>
   {/* <Rover
          direction={roverData.direction}
          x={roverData.x}
          y={roverData.y}
          instructions={roverData.instructions}
        />

          <UserData onSendData={handleSendData} />
       */}
    <GridPlateou

      />
       
    </>
  );
}

export default App;
