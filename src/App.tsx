
import './App.css';
import FinalInfoRover from './Components/FinalInfoRover';
import GridPlateou from './Components/GridPlateou';
import PlateouInfo from './Components/PlateouInfo';
import Rover from './Components/Rover';
import UserData from './Components/UserData';

function App() {
  return (
    <div className="App">
        <p>        App       </p>
         <GridPlateou/>
        <PlateouInfo/>
    <FinalInfoRover/>
    <Rover/>
    <UserData/> 


    </div>
  );
}

export default App;
