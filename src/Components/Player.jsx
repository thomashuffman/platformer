import React, { useState, useEffect } from 'react';
import playerSprite from '../player.png'; // Import your pixel art player sprite

const Player = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const gravity = 0.5; // Adjust the gravity strength as needed
  const jumpStrength = -10; // Adjust the jump strength as needed
  const groundLevel = 200; // Adjust the ground level as needed

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' && position.y >= groundLevel) {
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: jumpStrength }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position.y]);

  useEffect(() => {
    const gravityInterval = setInterval(() => {
      if (position.y < groundLevel) {
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: prevVelocity.y + gravity }));
      } else {
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
        setPosition((prevPosition) => ({ ...prevPosition, y: groundLevel }));
      }
    }, 1000 / 60); // Update every frame (60 FPS)

    return () => clearInterval(gravityInterval);
  }, [position.y]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const nextPosition = {
        x: position.x + velocity.x,
        y: position.y + velocity.y,
      };

      // Collision detection with platforms
      const platformBounds = {
        left: 100, // Adjust the left position of the platform
        right: 300, // Adjust the right position of the platform
        top: groundLevel - 20, // Adjust the top position of the platform
        bottom: groundLevel, // Adjust the bottom position of the platform
      };

      if (
        nextPosition.x < platformBounds.right &&
        nextPosition.x + 50 > platformBounds.left &&
        nextPosition.y < platformBounds.bottom &&
        nextPosition.y + 50 > platformBounds.top
      ) {
        // Player collides with platform, stop falling
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
        setPosition((prevPosition) => ({ ...prevPosition, y: platformBounds.top - 50 }));
      } else {
        setPosition(nextPosition);
      }
    }, 1000 / 60); // Update every frame (60 FPS)

    return () => clearInterval(moveInterval);
  }, [position, velocity]);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '50px', // Adjust the size as needed
        height: '50px', // Adjust the size as needed
        backgroundImage: `url(${playerSprite})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    ></div>
  );
};

export default Player;
