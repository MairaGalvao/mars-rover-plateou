import React, { ReactElement, useReducer, useEffect } from 'react';

const SET_DIRECTION = 'SET_DIRECTION';

const directionReducer = (state: number, action: { type: string; payload: number }) => {
  switch (action.type) {
    case SET_DIRECTION:
      return action.payload;
    default:
      return state;
  }
};

interface RoverProps {
  direction: number; 
  x: number;
  y: number;
  instructions: string;
}

const Rover = ({ direction, x, y, instructions }: RoverProps): ReactElement => {
  const [internalDirection, dispatch] = useReducer(directionReducer, 0);

  useEffect(() => {
    dispatch({ type: SET_DIRECTION, payload: direction });
  }, [direction]);

  return (
    <div>
      <div
        style={{
          transform: `rotate(${internalDirection}deg)`,
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        &#8593;
      </div>
      <div>
        <p>X coordinate: {x}</p>
      </div>
      <div>
        <p>Y coordinate: {y}</p>
      </div>
      <div>
        <p>Instructions: {instructions}</p>
      </div>
    </div>
  );
};

export default Rover;
