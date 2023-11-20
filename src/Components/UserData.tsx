import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../Style/UserData.css';

interface UserDataProps {
  onSendData: (direction: number, x: number, y: number, sizeX: number, sizeY: number, instructions: string) => void;
}

const UserData = ({ onSendData }: UserDataProps) => {
  const [directionInput, setDirectionInput] = useState('');
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [sizeXInput, setSizeXInput] = useState('');
  const [sizeYInput, setSizeYInput] = useState('');
  const [instructionsInput, setInstructionsInput] = useState('');
  const [userDataArray, setUserDataArray] = useState<any[]>([]);
  const [finalDirection, setFinalDirection] = useState<number | null>(null);
  const [finalX, setFinalX] = useState<number | null>(null);
  const [finalY, setFinalY] = useState<number | null>(null);
  const [step, setStep] = useState<number>(0);

  const mapDirectionToNumber = (direction: string): number => {
    switch (direction.toUpperCase()) {
      case 'N':
        return 0;
      case 'E':
        return 90;
      case 'S':
        return 180;
      case 'W':
        return 270;
      default:
        return parseFloat(direction) || 0;
    }
  };

  const mapNumberToDirection = (numericDirection: number): string => {
    switch (numericDirection) {
      case 0:
        return 'N';
      case 90:
        return 'E';
      case 180:
        return 'S';
      case 270:
        return 'W';
      default:
        return numericDirection.toString();
    }
  };

  const handleDirectionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDirectionInput(event.target.value);
  };

  const handleXInput = (event: ChangeEvent<HTMLInputElement>) => {
    setXInput(event.target.value);
  };

  const handleYInput = (event: ChangeEvent<HTMLInputElement>) => {
    setYInput(event.target.value);
  };

  const handleSizeXInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSizeXInput(event.target.value);
  };

  const handleSizeYInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSizeYInput(event.target.value);
  };

  const handleInstructionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInstructionsInput(event.target.value);
  };

  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const numericDirection = mapDirectionToNumber(directionInput);
      console.log(`Sending Data to Rover: Direction: ${mapNumberToDirection(numericDirection)}, X: ${xInput}, Y: ${yInput}, SizeX: ${sizeXInput}, SizeY: ${sizeYInput}, Instructions: ${instructionsInput}`);
      onSendData(
        numericDirection,
        parseFloat(xInput),
        parseFloat(yInput),
        parseFloat(sizeXInput),
        parseFloat(sizeYInput),
        instructionsInput
      );

      setUserDataArray((prevArray) => [
        ...prevArray,
        {
          direction: mapNumberToDirection(numericDirection),
          x: parseFloat(xInput),
          y: parseFloat(yInput),
          sizeX: parseFloat(sizeXInput),
          sizeY: parseFloat(sizeYInput),
          instructions: instructionsInput,
        },
      ]);

      setStep(2);
    } else if (step === 2) {
      setStep(0);
    }
  };

  const handleInstructionsSubmit = (event: FormEvent) => {
    event.preventDefault();

    let newX = parseFloat(xInput);
    let newY = parseFloat(yInput);
    let newDirection = mapDirectionToNumber(directionInput);

    for (const instruction of instructionsInput.split('')) {
      if (instruction === 'M') {
        switch (newDirection) {
          case 0:
            newY += 1;
            console.log(`Moving Up: New Y: ${newY}`);
            break;
          case 90:
            newX += 1;
            console.log(`Moving Right: New X: ${newX}`);
            break;
          case 180:
            newY -= 1;
            console.log(`Moving Down: New Y: ${newY}`);
            break;
          case 270:
            newX -= 1;
            console.log(`Moving Left: New X: ${newX}`);
            break;
          default:
            break;
        }
      } else if (instruction === 'L') {
        newDirection -= 90;
        newDirection = (newDirection + 360) % 360;
        console.log(`Turning Left: New Direction: ${newDirection}`);
      } else if (instruction === 'R') {
        newDirection += 90;
        newDirection = (newDirection + 360) % 360;
        console.log(`Turning Right: New Direction: ${newDirection}`);
      }
    }

    console.log(`Sending Data to Rover: Direction: ${mapNumberToDirection(newDirection)}, X: ${newX}, Y: ${newY}, Instructions: ${instructionsInput}`);
    onSendData(newDirection, newX, newY, parseFloat(sizeXInput), parseFloat(sizeYInput), instructionsInput);

    setUserDataArray((prevArray) => [
      ...prevArray,
      {
        direction: mapNumberToDirection(newDirection),
        x: newX,
        y: newY,
        sizeX: parseFloat(sizeXInput),
        sizeY: parseFloat(sizeYInput),
        instructions: instructionsInput,
      },
    ]);

    setFinalDirection(newDirection);
    setFinalX(newX);
    setFinalY(newY);
    setStep(0);
  };

  return (


    <div className="UserData">

      <h1 className='main-title'>Mars Rover </h1>
      {step === 0 && (
        <form id='x-y-inputs' className='form-user' onSubmit={handleButtonClick}>
          <label>
            Enter X Dimension of Plateau: <input type="text" value={sizeXInput} onChange={handleSizeXInput} required />
          </label>
          <label>
            Enter Y Dimension of Plateau: <input type="text" value={sizeYInput} onChange={handleSizeYInput} required />
          </label>
          <button className='btn-user' type="submit">Choose</button>
        </form>
      )}

      {step === 1 && (
        <form className='form-user' id='rover-position' onSubmit={handleButtonClick}>
          <label>
            Enter X Coordinate for Rover: <input type="text" value={xInput} onChange={handleXInput} required />
          </label>
          <label>
            Enter Y Coordinate for Rover: <input type="text" value={yInput} onChange={handleYInput} required />
          </label>
          <label>
            Enter Rover Direction on Landing: <input type="text" value={directionInput} onChange={handleDirectionInput} required />
          </label>
          <button className='btn-user' type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form className='form-user' id='instructions-input' onSubmit={handleInstructionsSubmit}>
          <label>
            Enter Movement Instructions (LRM string): <input type="text" value={instructionsInput} onChange={handleInstructionsInput} required />
          </label>
          <button className='btn-user' type="submit">Start</button>
        </form>
      )}

      {finalDirection !== null && (
        <div className="final-direction">
          <h2>Final Rover's Position</h2>
          <p>Final Position: {finalX} {finalY} {mapNumberToDirection(finalDirection)}</p>
        </div>
      )}

      
    </div>
  );
};

export default UserData;
