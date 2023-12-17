import React, { useState, useEffect } from 'react';
import './Game.css';

// Function to make the bird jump
const jump = (setGravity) => {
  setGravity(-4);
  setTimeout(() => {
    setGravity(4);
  }, 150);
};

// Event handler for space key press
const handleKeyPress = (event, jump) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    jump();
  }
};


function Game() {
  const [birdPosition, setBirdPosition] = useState(50);
  const [gravity, setGravity] = useState(4);

  useEffect(() => {
    // Game loop
    const gameInterval = setInterval(() => {
      setBirdPosition((prevPosition) => prevPosition + gravity);
    }, 30);

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
    </div>
  );
}

export default Game;
