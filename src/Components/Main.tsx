import React, { ChangeEvent, useState } from 'react';
import Rover from './Rover';
import PlateauMars  from './PlateauMars';

interface Position {
    roverX: number,
    roverY: number,
    cardinal: string
}


function Main() {

    const [startingRovers, setStartingRovers] = useState<any[]>([]);      
    const [finalRovers, setFinalRovers] = useState<Position[]>([]);

    const [didRunFinish, setDidRunFinish] = useState(false);

    const [position, setPosition] = useState('');
    const [instructions, setInstructions] = useState('');


    const [plateauSize, setPlateauSize] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);



    function addRover() {

        const inputX = Number(position.split(' ')[0])
        const inputY = Number(position.split(' ')[1])
        const inputCardinal = position.split(' ')[2]

        const roverProps = {
            x: inputX,
            y: inputY,
            initialCardinal: inputCardinal,
            intrusctions: instructions,
        }

        const rover = new (Rover as any)(roverProps)



        setStartingRovers(startingRovers => [...startingRovers, { rover: rover, initialValue: { roverX: rover.x, roverY: rover.y, cardinal: rover.cardinal } }])
        setPosition('')
        setInstructions('')


    }

function choosePlateauSize(){

    const plateauX = Number(plateauSize.split(' ')[0])
    const plateauY = Number(plateauSize.split(' ')[1])


    const plateauProps = {
        x: plateauX,
        y: plateauY,
    }

    const plateau = new (PlateauMars as any)(plateauProps)
    setPlateauSize('')

}



    function runRovers() {
        startingRovers.forEach(function (startRover) {
            startRover.rover.run()
            setFinalRovers(finalRovers => [...finalRovers, { roverX: startRover.rover.x, roverY: startRover.rover.y, cardinal: startRover.rover.cardinal }]);
        })
        setDidRunFinish(true)
    }

function isCoordinateInvalid(inputString:string){
    const xSize = Number(inputString.split(' ')[0])
    const ySize = Number(inputString.split(' ')[1])

    if ((xSize <= 0 ) || (ySize <= 0)){
        return true
    }
    if (Number.isNaN(xSize) || Number.isNaN(ySize) ){
        return true
    }
    return false
       
}
function isPlateauInputInvalid(){
    return isCoordinateInvalid(plateauSize)
}

function isRoverInputInvalid(){
    const coordinatesInvalid = isCoordinateInvalid(position)
    const cardinalLetters  = ['N', "E", "S", "W"]
    
    let didFindMatch = false
    for (let i = 0; i < cardinalLetters.length; i++ ){
      if(position.split(' ')[2] === cardinalLetters[i]){
        didFindMatch = true
      }

    }
    const cardinalIsBad = didFindMatch === false 
    if (coordinatesInvalid || cardinalIsBad){
        return true
    }
    return false
}
    



    return (
        <>

<div >
                Plateau size:{' '}
  
              
  
                <input   type="text"
                    value={plateauSize}
                    onChange={(event) => {
                        setPlateauSize(event.target.value);
                    }}
                    required
              
                />


              <button disabled={isPlateauInputInvalid()} onClick={choosePlateauSize}> Size Plateau</button>

            </div>


            <div >
                Landing Position:{' '}
                <input
                    type="text"
                    value={position}
                    onChange={(event) => {
                        setPosition(event.target.value);
                    }}
                    required
                />
                Instruction:{' '}
                <input
                    type="text"
                    value={instructions}
                    onChange={(event) => {
                        setInstructions(event.target.value);
                    }}
                    required
                />

            </div>


            <button className="btn-user" disabled={isRoverInputInvalid()} onClick={addRover}>
                Add
            </button>


            {startingRovers.map((initPosition, index) => {
                return <div key={index} >
                    <p>Landing Position: {initPosition.initialValue.roverX} {initPosition.initialValue.roverY} {initPosition.initialValue.cardinal}</p>
                    <p>Instruction: {initPosition.rover.movingInstructions}</p>
                    {didRunFinish && <p><b>Final position:</b> {finalRovers[index].roverX} {finalRovers[index].roverY} {finalRovers[index].cardinal}</p>}
                </div>
            })}

            {/* Start the Plateau */}
            <button onClick={runRovers} disabled={startingRovers.length === 0}>Run Rovers</button>







        </>
    )

}

export default Main;
