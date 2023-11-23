import React, { ChangeEvent, useState } from 'react';
import Rover from './Rover';

interface Position {
    roverX: number,
    roverY: number,
    cardinal: string
}

interface InitialRovers {
    position: Position
    instructions: string
}

function Main() {

    const [position, setPosition] = useState('');
    const [instructions, setInstructions] = useState('');
    const [finalRovers, setFinalRovers] = useState<Position[]>([]);
    const [roversCount, setRoversCount] = useState(1);
    const [startingRovers, setStartingRovers] = useState<InitialRovers[]>([]);




    function addRover() {

        const inputX = Number(position.split(' ')[0])
        const inputY = Number(position.split(' ')[1])
        const inputCardinal = position.split(' ')[2]

        setStartingRovers(startingRovers => [...startingRovers, {
            position:
            {
                roverX: inputX,
                roverY: inputY,
                cardinal: inputCardinal
            },
            instructions: instructions
        }])


        const roverProps = {
            x: position.split(' ')[0],
            y: position.split(' ')[1],
            initialCardinal: position.split(' ')[2],
            intrusctions: instructions,
        }

        const rover = new (Rover as any)(roverProps)
        rover.run()


        console.log(rover.x, rover.y, rover.cardinal)
        const roverPosition = { roverX: rover.x, roverY: rover.y, cardinal: rover.cardinal }
        setFinalRovers(finalRovers => [...finalRovers, roverPosition]);
        setRoversCount(roversCount + 1)

        // create an object with position and instruction 


    }

    console.log(startingRovers)

    function startRovers() {
        //  
    }

    return (
        <>
            {Array.from({ length: roversCount }).map((_, index) => (
                <div key={index}>
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
            ))}

            <button className="btn-user" onClick={addRover}>
                Add
            </button>
            {finalRovers.map((position, index) => {
                return <div key={index} >
                    <h1>{position.roverX} {position.roverY} {position.cardinal} </h1>
                </div>
            })}

            {/* Start the Plateau */}
            <button onClick={startRovers}> Start</button>


        </>
    )

}

export default Main;
