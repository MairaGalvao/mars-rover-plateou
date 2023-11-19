import React, { ReactElement, useEffect, useReducer } from 'react';

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
  direction: string;
}

const Rover = ({ direction }: RoverProps): ReactElement => {
  const [internalDirection, dispatch] = useReducer(directionReducer, 0);

  useEffect(() => {
    switch (direction) {
      case 'N':
        dispatch({ type: SET_DIRECTION, payload: 0 });
        break;
      case 'E':
        dispatch({ type: SET_DIRECTION, payload: 90 });
        break;
      case 'S':
        dispatch({ type: SET_DIRECTION, payload: 180 });
        break;
      case 'W':
        dispatch({ type: SET_DIRECTION, payload: 270 });
        break;
      default:
        console.error('Invalid direction:', direction);
        break;
    }
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
    </div>
  );
};

export default Rover;
