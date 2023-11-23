import  { useState } from 'react';
import Rover from './Rover';
import PlateauMars from './PlateauMars';
import '../Style/Main.css';
import UserInstructions from './UserInstructions';


interface Position {
    roverX: number,
    roverY: number,
    cardinal: string
}


function Main() {
    const [startingRovers, setStartingRovers] = useState<any[]>([]);
    const [finalRovers, setFinalRovers] = useState<Position[]>([]);
    const [didRunFinish, setDidRunFinish] = useState(false);
    
    const [plateauX, setPlateauX] = useState(0);
    const [plateauY, setPlateauY] = useState(0);

    const [currPlateauSize, setCurrPlateauSize] = useState('');
    const [currPositionInput, setCurrPositionInput] = useState('');
    const [currInstructionsInput, setCurrInstructionsInput] = useState('');


    function addRover() {
        const inputX = Number(currPositionInput.split(' ')[0])
        const inputY = Number(currPositionInput.split(' ')[1])
        const inputCardinal = currPositionInput.split(' ')[2]

        const roverProps = {
            xPlateau: plateauX,
            yPlateau: plateauY,
            x: inputX,
            y: inputY,
            initialCardinal: inputCardinal,
            intrusctions: currInstructionsInput,
        }
        const rover = new (Rover as any)(roverProps)
        setStartingRovers(startingRovers => [...startingRovers, { rover: rover, initialValue: { roverX: rover.x, roverY: rover.y, cardinal: rover.cardinal } }])
        setCurrPositionInput('')
        setCurrInstructionsInput('')
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
        return isCoordinateInvalid(currPlateauSize)
    }

    function isRoverInputInvalid() {
        const xSize = Number(currPositionInput.split(' ')[0])
        const ySize = Number(currPositionInput.split(' ')[1])

        const coordinatesInvalid = isCoordinateInvalid(currPositionInput)
        const cardinalLetters = ['N', "E", "S", "W"]

        let didFindMatch = false
        for (let i = 0; i < cardinalLetters.length; i++) {
            if (currPositionInput.split(' ')[2] === cardinalLetters[i]) {
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

    function onPlateauClick() {
        setPlateauX(Number(currPlateauSize.split(' ')[0]))
        setPlateauY(Number(currPlateauSize.split(' ')[1]))
    }

    return (
        <>
            <UserInstructions />

            <div id='plateau-rover-form' className='plateau-rover-form'>

                {/* plateau input */}
                <label className='label'>Plateau size:</label>
                <input type="text" id='plateau-size' value={currPlateauSize} onChange={(event) => {
                    setCurrPlateauSize(event.target.value);
                }} required />
                <button id='btn-size-plateau' disabled={isPlateauInputInvalid()} onClick={onPlateauClick}>Set Plateau</button>

                {/* rover input */}
                <div className='position'>
                    <label className='label'>Landing Pos:</label>
                    <input type="text" id='landing-rover' value={currPositionInput} onChange={(event) => {
                        setCurrPositionInput(event.target.value);
                    }} required />
                </div>
                <label className='label'>Instruction:</label>
                <input id='instructions' type="text" value={currInstructionsInput} onChange={(event) => {
                    setCurrInstructionsInput(event.target.value);
                }} required />
            </div>

            {/* add button */}
            <button id='add-rover' className="button" disabled={isRoverInputInvalid()} onClick={addRover}>Add</button>

            {/* display added rovers */}
            {startingRovers.map((initPosition, index) => {
                return <div key={index} >
                    <p>Landing Position: {initPosition.initialValue.roverX} {initPosition.initialValue.roverY} {initPosition.initialValue.cardinal}</p>
                    <p>Instruction: {initPosition.rover.movingInstructions}</p>

                    {/* display rovers results, after running */}
                    {didRunFinish && <div><b>Final position:</b>
                        <div id='final-position-rover'>{finalRovers[index].roverX} {finalRovers[index].roverY} {finalRovers[index].cardinal}</div>
                    </div>}

                </div>
            })}

            {/* run button */}
            <button className='button' onClick={runRovers} disabled={startingRovers.length === 0} id='run-rover'>Run Rovers</button>
            
            {/* plateau */}
            <PlateauMars x={plateauX} y={plateauY} initialCoordinates={startingRovers} finalCoordinates={finalRovers} />

        </>
    )

}

export default Main;
