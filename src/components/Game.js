import React, { useState, useEffect } from 'react';
import './Game.css';

// Function to make the bird jump
const jump = (setGravity) => {
  setGravity(-6);
  setTimeout(() => {setGravity(3)}, 120);
};

// Event handler for space key press
const handleKeyPress = (event, jump) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    jump();
  }
};


const Game = () => {
  const [birdPosition, setBirdPosition] = useState(100);
  const [gravity, setGravity] = useState(3);

  useEffect(() => {
    // Game loop
    const gameInterval = setInterval(() => {
      setBirdPosition((prevPosition) => prevPosition + gravity);
    }, 10);

    // Event listener for keydown
    const keyPressHandler = (event) => handleKeyPress(event, () => jump(setGravity));
    window.addEventListener('keydown', keyPressHandler);

    // Clean up the interval and event listener on component unmount
    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [gravity]);

  return (
    <div className="game" onClick={() => jump(setGravity)}>
      <div className="bird" style={{ top: `${birdPosition}px` }}></div>
      <div className="ground"></div>
    </div>
  );
}

export default Game;
