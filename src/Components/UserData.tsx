import React, { useState, ChangeEvent } from 'react';
import '../Style/UserData.css';

interface UserDataProps {
  onDirectionClick: (direction: string) => void;
}

function UserData({ onDirectionClick }: UserDataProps) {
  const [directionInput, setDirectionInput] = useState('');

  const handleDirectionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDirectionInput(event.target.value);
  };

  const handleButtonClick = () => {
    // Send the direction back to the Rover component
    onDirectionClick(directionInput);
  };

  return (
    <div className="UserData">
      <p>UserData</p>
      <label>
        Enter direction:
        <input type="text" value={directionInput} onChange={handleDirectionInput} />
      </label>
      <button onClick={handleButtonClick}>Send Direction to Rover</button>
    </div>
  );
}

export default UserData;
