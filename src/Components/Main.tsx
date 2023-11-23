import React, { ChangeEvent, useEffect, useState } from 'react';
import Rover from './Rover';
import PlateauMars from './PlateauMars';
import '../Style/Main.css';


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

        const plateauX = Number(plateauSize.split(' ')[0])
        const plateauY = Number(plateauSize.split(' ')[1])


        const roverProps = {
            xPlateau: plateauX,
            yPlateau: plateauY,
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

   
    function runRovers() {
        startingRovers.forEach(function (startRover) {
            const runFinishedSuccessfully = startRover.rover.run()
            let finalRoverObj = { roverX: startRover.rover.x, roverY: startRover.rover.y, cardinal: startRover.rover.cardinal }
            if (!runFinishedSuccessfully) {
                finalRoverObj = { roverX: -1, roverY: -1, cardinal: 'exceeded plateau' }
            }
            setFinalRovers(finalRovers => [...finalRovers, finalRoverObj]);

        })
        setDidRunFinish(true)

    }


    function isCoordinateInvalid(inputString: string) {
        const xSize = Number(inputString.split(' ')[0])
        const ySize = Number(inputString.split(' ')[1])

        if ((xSize <= 0) || (ySize <= 0)) {
            return true
        }
        if (Number.isNaN(xSize) || Number.isNaN(ySize)) {
            return true
        }
        return false

    }
    function isPlateauInputInvalid() {
        return isCoordinateInvalid(plateauSize)
    }

    function isRoverInputInvalid() {
        const xSize = Number(position.split(' ')[0])
        const ySize = Number(position.split(' ')[1])

        const plateauX = Number(plateauSize.split(' ')[0])
        const plateauY = Number(plateauSize.split(' ')[1])

        const coordinatesInvalid = isCoordinateInvalid(position)
        const cardinalLetters = ['N', "E", "S", "W"]

        let didFindMatch = false
        for (let i = 0; i < cardinalLetters.length; i++) {
            if (position.split(' ')[2] === cardinalLetters[i]) {
                didFindMatch = true
            }

        }
        const cardinalIsBad = didFindMatch === false
        if (coordinatesInvalid || cardinalIsBad) {
            return true
        }
        if (xSize > plateauX || ySize > plateauY) {
            console.log(xSize, ySize, plateauX, plateauY)
            return true
        }



        return false
    }




    return (
        <>

        
<div className='main-app'>

<div>
<h1 className='main-title'>Plateau Mars</h1>

<h2>Instructions</h2>
  <ol>
    <li>Enter the upper-right coordinates of the plateau.</li>
    <li>For each rover:</li>
    <ul>
      <li>Specify the landing position (x, y, position(cardinal)).</li>
      <li>Provide instructions using 'L', 'R', and 'M'.</li>
      <li>Click "Add Rover" to deploy the rover on the plateau.</li>
    </ul>
    <li>After adding all rovers, click "Run Rovers" to see their final positions displayed in the Plateau.</li>
  </ol>
</div>
<div id='plateau-rover-form' className='plateau-rover-form'>

            <div >
                <label className='label'>Plateau size:{' '}</label>


                <input type="text"
                    id='plateau-size'
                    value={plateauSize}
                    onChange={(event) => {
                        setPlateauSize(event.target.value);
                    }}
                    required

                />
                <button id='btn-size-plateau' disabled={isPlateauInputInvalid()} > Size Plateau</button>

         


            <div className='position'>
                <label className='label'> Landing Pos:{' '}</label>
                <input
                    type="text"
                    id='landing-rover'
                    value={position}
                    onChange={(event) => {
                        setPosition(event.target.value);
                    }}
                    required
                />
                </div>
                <label className='label'>Instruction:{' '}</label>
                <input

                    id='instructions'
                    type="text"
                    value={instructions}
                    onChange={(event) => {
                        setInstructions(event.target.value);
                    }}
                    required
                />

            </div>

            </div>
            <button id='add-rover' className="button" disabled={isRoverInputInvalid()} onClick={addRover}>
                Add
            </button>


            {startingRovers.map((initPosition, index) => {
                return <div key={index} >
                    <p>Landing Position: {initPosition.initialValue.roverX} {initPosition.initialValue.roverY} {initPosition.initialValue.cardinal}</p>
                    <p>Instruction: {initPosition.rover.movingInstructions}</p>

                    <div>
                        {didRunFinish && <div><b>Final position:</b>
                            <div id='final-position-rover'>{finalRovers[index].roverX} {finalRovers[index].roverY} {finalRovers[index].cardinal}</div>
                        </div>}

                    </div>
                </div>
            })}

            <button className= 'button' onClick={runRovers} disabled={startingRovers.length === 0} id='run-rover'>Run Rovers</button>
            <PlateauMars x={Number(plateauSize.split(' ')[0])} y={Number(plateauSize.split(' ')[1])} initialCoordinates={startingRovers} finalCoordinates={finalRovers} />

            </div>
        </>
    )

}

export default Main;
