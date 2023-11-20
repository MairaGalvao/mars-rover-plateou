import React, { useState, ChangeEvent } from 'react';
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

  const handleButtonClick = () => {
    const numericDirection = mapDirectionToNumber(directionInput);
    console.log(`Sending Data to Rover: Direction: ${numericDirection}, X: ${xInput}, Y: ${yInput}, SizeX: ${sizeXInput}, SizeY: ${sizeYInput}, Instructions: ${instructionsInput}`);
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
        direction: numericDirection,
        x: parseFloat(xInput),
        y: parseFloat(yInput),
        sizeX: parseFloat(sizeXInput),
        sizeY: parseFloat(sizeYInput),
        instructions: instructionsInput,
      },
    ]);
  };

  const handleInstructionsSubmit = () => {
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

    console.log(`Sending Data to Rover: Direction: ${newDirection}, X: ${newX}, Y: ${newY}, Instructions: ${instructionsInput}`);
    onSendData(newDirection, newX, newY, parseFloat(sizeXInput), parseFloat(sizeYInput), instructionsInput);

    setUserDataArray((prevArray) => [
      ...prevArray,
      {
        direction: newDirection,
        x: newX,
        y: newY,
        sizeX: parseFloat(sizeXInput),
        sizeY: parseFloat(sizeYInput),
        instructions: instructionsInput,
      },
    ]);
  };

  return (
    <div className="UserData">
      <label>
        Enter size X of plateau:
        <input type="text" value={sizeXInput} onChange={handleSizeXInput} />
      </label>
      <label>
        Enter size Y of plateau:
        <input type="text" value={sizeYInput} onChange={handleSizeYInput} />
      </label>
      <button onClick={handleButtonClick}>Send Data to Rover</button>

      <label>
        Enter landing direction:
        <input type="text" value={directionInput} onChange={handleDirectionInput} />
      </label>
      <label>
        Enter X coordinate:
        <input type="text" value={xInput} onChange={handleXInput} />
      </label>
      <label>
        Enter Y coordinate:
        <input type="text" value={yInput} onChange={handleYInput} />
      </label>
      <button onClick={handleButtonClick}>Send Data to Rover</button>

      <hr />

      <label>
        Enter instructions (LRM string):
        <input type="text" value={instructionsInput} onChange={handleInstructionsInput} />
      </label>
      <button onClick={handleInstructionsSubmit}>Start Instructions</button>

      {/* Display User Data Array */}
      <div className="user-data-array">
        <h2>User Data Array</h2>
        <ul>
          {userDataArray.map((userData, index) => (
            <li key={index}>
              Direction: {userData.direction}, X: {userData.x}, Y: {userData.y}, SizeX: {userData.sizeX}, SizeY: {userData.sizeY}, Instructions: {userData.instructions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserData;
