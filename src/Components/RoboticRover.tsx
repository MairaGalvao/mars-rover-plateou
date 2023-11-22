import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import '../Style/RoboticRover.css';

interface RoboticRoverProps {
  onSendData: (
    id: string,
    direction: number,
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    instructions: string
  ) => void;
}

const RoboticRover = ({ onSendData }: RoboticRoverProps) => {
  const [idInput, setIdInput] = useState('');
  const [initPositionUser, setInitPositionUser] = useState('');
  const [initXCoordinateUser, setInitXCoordinateUser] = useState('');
  const [initYCoordinateUser, setInitYCoordinateUser] = useState('');
  const [sizeXPlateauUser, setSizeXPlateauUser] = useState('');
  const [sizeYPlateauUser, setSizeYPlateauUser] = useState('');
  const [instructionsUser, setInstructionsUser] = useState('');
  const [multipleRovers, setMultipleRovers] = useState<any[]>([]);
  const [finalRoverCardinalPointer, setFinalRoverCardinalPointer] = useState<number | null>(null);
  const [finalRoverCoordinateX, setFinalRoverCoordinateX] = useState<number | null>(null);
  const [finalRoverCoordinateY, setFinalCRoverCoordinateY] = useState<number | null>(null);
  const [stepForm, setStepForm] = useState<number>(0);

  useEffect(() => {
    const storedStep = localStorage.getItem('roverStep');
    if (storedStep) {
      setStepForm(parseInt(storedStep, 10));
    }

    return () => {
      localStorage.removeItem('roverStep');
    };
  }, [setStepForm]);

  const changeCardinalPointsToNumber = (cardinalName: string): number => {
    switch (cardinalName.toUpperCase()) {
      case 'N':
        return 0;
      case 'E':
        return 90;
      case 'S':
        return 180;
      case 'W':
        return 270;
      default:
        return parseFloat(cardinalName) || 0;
    }
  };

  const changeNumberToCardinalPoints = (cardinalDegrees: number): string => {
    switch (cardinalDegrees) {
      case 0:
        return 'N';
      case 90:
        return 'E';
      case 180:
        return 'S';
      case 270:
        return 'W';
      default:
        return cardinalDegrees.toString();
    }
  };

  const handleIdInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIdInput(event.target.value);
  };

  const handleDirectionInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toUpperCase();

    if (!/^[NSEW]$/.test(input)) {
      alert('Invalid input. Please enter N, S, E, or W for Rover Direction.');
      return;
    }

    setInitPositionUser(input);
  };

  const handleXInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!/^\d+$/.test(inputValue)) {
      alert('Please enter a numeric value for X Coordinate.');
      return;
    }

    if (parseFloat(inputValue) > parseFloat(sizeXPlateauUser)) {
      alert('Your X coordinates initial value is bigger than the actual size of the plateau');
      return;
    }

    setInitXCoordinateUser(inputValue);
  };

  const handleYInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!/^\d+$/.test(inputValue)) {
      alert('Please enter a numeric value for Y Coordinate.');
      return;
    }

    if (parseFloat(inputValue) > parseFloat(sizeYPlateauUser)) {
      alert('Your Y coordinates initial value is bigger than the actual size of the plateau');
      return;
    }

    setInitYCoordinateUser(inputValue);
  };

  const handleSizeXInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!/^\d+$/.test(inputValue)) {
      alert('Please enter a numeric value for X Dimension of Plateau.');
      return;
    }

    setSizeXPlateauUser(inputValue);
  };

  const handleSizeYInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSizeYPlateauUser(event.target.value);
  };

  const handleInstructionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toUpperCase();

    if (!/^[MRL, ]+$/.test(input)) {
      alert('Invalid input. Please enter only M, R, L, with space or comma.');
      return;
    }

    setInstructionsUser(input);
  };

  const handleButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (stepForm === 0) {
      setStepForm(1);
    } else if (stepForm === 1) {
      const numericDirection = changeCardinalPointsToNumber(initPositionUser);
      const id = `rover-${multipleRovers.length + 1}`;
      onSendData(
        id,
        numericDirection,
        parseFloat(initXCoordinateUser),
        parseFloat(initYCoordinateUser),
        parseFloat(sizeXPlateauUser),
        parseFloat(sizeYPlateauUser),
        instructionsUser
      );

      setMultipleRovers((prevArray) => [
        ...prevArray,
        {
          id,
          direction: changeNumberToCardinalPoints(numericDirection),
          x: parseFloat(initXCoordinateUser),
          y: parseFloat(initYCoordinateUser),
          sizeX: parseFloat(sizeXPlateauUser),
          sizeY: parseFloat(sizeYPlateauUser),
          instructions: instructionsUser,
        },
      ]);

      setStepForm(2);
    } else if (stepForm === 2) {
      setStepForm(1);
    }
    localStorage.setItem('roverStep', stepForm.toString());
  };

  const handleInstructionsSubmit = (event: FormEvent) => {
    event.preventDefault();

    let newX = parseFloat(initXCoordinateUser);
    let newY = parseFloat(initYCoordinateUser);
    let newDirection = changeCardinalPointsToNumber(initPositionUser);

    for (const instruction of instructionsUser.split('')) {
      if (instruction === 'M') {
        switch (newDirection) {
          case 0:
            newY += 1;
            break;
          case 90:
            newX += 1;
            break;
          case 180:
            newY -= 1;
            break;
          case 270:
            newX -= 1;
            break;
          default:
            break;
        }
      } else if (instruction === 'L') {
        newDirection -= 90;
        newDirection = (newDirection + 360) % 360;
      } else if (instruction === 'R') {
        newDirection += 90;
        newDirection = (newDirection + 360) % 360;
      }
    }

    const id = `rover-${multipleRovers.length + 1}`;
    onSendData(id, newDirection, newX, newY, parseFloat(sizeXPlateauUser), parseFloat(sizeYPlateauUser), instructionsUser);

    setMultipleRovers((prevArray) => [
      ...prevArray,
      {
        id,
        direction: changeNumberToCardinalPoints(newDirection),
        x: newX,
        y: newY,
        sizeX: parseFloat(sizeXPlateauUser),
        sizeY: parseFloat(sizeYPlateauUser),
        instructions: instructionsUser,
      },
    ]);

    setFinalRoverCardinalPointer(newDirection);
    setFinalRoverCoordinateX(newX);
    setFinalCRoverCoordinateY(newY);
    setStepForm(1);
    localStorage.setItem('roverStep', '1');
  };

  return (
    <div className="user-data">
      <h1 className="main-title">Mars Rover</h1>
      {stepForm === 0 && (
        <form id="x-y-inputs" className="form-user" onSubmit={handleButtonClick}>
          <label className='label'>
            Enter X Dimension of Plateau: <input type="text" id='x-plateau-size' value={sizeXPlateauUser} onChange={handleSizeXInput} required />
          </label>
          <label className='label'>
            Enter Y Dimension of Plateau: <input type="text" id='y-plateau-size' value={sizeYPlateauUser} onChange={handleSizeYInput} required />
          </label>
          <button id='btn-size-plateau' className="btn-user" type="submit">
            Choose
          </button>
        </form>
      )}

      {stepForm === 1 && (
        <form className="form-user" id="rover-position" onSubmit={handleButtonClick}>
          <label className='label'>
            Enter X Coordinate for Rover: <input id='x-init-coord' type="text" value={initXCoordinateUser} onChange={handleXInput} required />
          </label>
          <label className='label'>
            Enter Y Coordinate for Rover: <input id='y-init-coord' type="text" value={initYCoordinateUser} onChange={handleYInput} required />
          </label>
          <label className='label'>
            Enter Rover Direction on Landing: <input id='init-point' type="text" value={initPositionUser} onChange={handleDirectionInput} required />
          </label>
          <button className="btn-user" id='btn-rover-init-position' type="submit"  >
            Next
          </button>
        </form>
      )}

      {stepForm === 2 && (
        <form className="form-user" id="instructions-input" onSubmit={handleInstructionsSubmit}>
          <label className='label'>
            Enter Movement Instructions (LRM string):{' '}
            <input id= 'instructions-user' type="text" value={instructionsUser} onChange={handleInstructionsInput} required />
          </label>
          <button className="btn-user" type="submit" id='btn-instructions'>
            Start
          </button>
        </form>
      )}

      {finalRoverCardinalPointer !== null && (
        <div className="final-direction" id='final-position-rover'>
          <h2>Final Rover's Position</h2>
          <p >
            Final Position: {finalRoverCoordinateX} {finalRoverCoordinateY}{' '}
            {changeNumberToCardinalPoints(finalRoverCardinalPointer)}
          </p>
        </div>
      )}

      {stepForm === 3 && (
        <button className="btn-user" onClick={() => setStepForm(0)}>
          Add Another Rover
        </button>
      )}
    </div>
  );
};

export default RoboticRover;
