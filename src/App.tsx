
import { useState } from 'react';
import './App.css';
import FinalInfoRover from './Components/FinalInfoRover';
import GridPlateou from './Components/GridPlateou';
import PlateouInfo from './Components/PlateouInfo';
import Rover from './Components/Rover';
import UserData from './Components/UserData';

function App() {

  const [direction, setDirection] = useState('');

  const handleDirectionClick = (value: string) => {
    setDirection(value);
  };
  return (
    <>
    <div className="App">
        <p>        App       </p>
         <GridPlateou/>
        <PlateouInfo/>
    <FinalInfoRover/>

    <div>
      <UserData onDirectionClick={handleDirectionClick} />
      <Rover direction={direction} />
    </div>
    </div>
    </>
  );
}

export default App;
