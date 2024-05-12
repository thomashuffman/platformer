    import React, { useState, useEffect } from 'react';
    import playerSprite from './assets/player.png'; // Import your player sprite PNG
    import Thomas from './assets/Thomas.png';
    import vomit from './assets/Vomit.png';
    import sleepy from './assets/sleepy.png';
    import dizzy from './assets/dizzy.png'
    import strech from './assets/strech.jpeg'
    import bump from './assets/bump.jpeg'
    import heartburn from './assets/heartburn.jpeg'
    import birth from './assets/birth.webp'
    import baby from './assets/baby.png'

    const App = () => {
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 200 }); // Initial player position
    const [playerVelocity, setPlayerVelocity] = useState({ x: 0, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [gameWin, setGameWin] = useState(false);
    const [movingLeft, setMovingLeft] = useState(false);
    const [movingRight, setMovingRight] = useState(false);
    const [enemies, setEnemies] = useState([]);
    const [score, setScore] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1); // Track the current level
    const [jumpCount, setJumpCount] = useState(0);
    
    
    
    
    const maxJumpCount = 2; // Maximum number of jumps allowed
    const gravity = 0.5; // Adjust gravity strength as needed
    const jumpStrength = -10; // Adjust jump strength as needed
    const moveSpeed = 5; // Adjust movement speed as needed
    const platformHeight = 20; // Height of platforms
    const platformWidth = 100; // Width of platforms
    const levelThreshold = 1500;

    // const platforms = [
    //     { x: 50,  y: 500},
    //     { x: 200, y: 300 },
    //     { x: 400, y: 250 },
    //     { x: 600, y: 350 },
    //     { x: 800, y: 590 },
    //     { x: 1000, y: 300 },
    //     { x: 1200, y: 500}
    // ];
    
    // const platforms2 = [
    //     { x: 50,  y: 600},
    //     { x: 200, y: 300 },
    //     { x: 400, y: 250 },
    //     { x: 600, y: 350 },
    //     { x: 1000, y: 300 },
    //     { x: 1200, y: 500}
    // ];

    // const platforms3 = [
    //     { x: 50,  y: 500},
    //     { x: 200, y: 300 },
    //     { x: 400, y: 250 },
    //     { x: 600, y: 350 },
    //     { x: 800, y: 590 },
    //     { x: 1000, y: 300 },
    //     { x: 1200, y: 500}
    // ];

    // const platforms4 = [
    //     { x: 50,  y: 500},
    //     { x: 200, y: 300 },
    //     { x: 400, y: 250 },
    //     { x: 600, y: 350 },
    //     { x: 800, y: 590 },
    //     { x: 1000, y: 300 },
    //     { x: 1200, y: 500}
    // ];

    // const platforms5 = [
    //     { x: 50,  y: 500},
    //     { x: 200, y: 300 },
    //     { x: 400, y: 250 },
    //     { x: 600, y: 350 },
    //     { x: 800, y: 590 },
    //     { x: 1000, y: 300 },
    //     { x: 1200, y: 500}
    // ];

    const levelsPlatforms = [
        [
          { x: 50, y: 500, hasImage: true, imageSrc: Thomas, },
          { x: 200, y: 300 },
          { x: 400, y: 250 },
          { x: 600, y: 350 },
          { x: 800, y: 400 },
          { x: 1000, y: 300 },
          { x: 1200, y: 500 },
        ],
        [
          { x: 50, y: 500 },
          { x: 150, y: 400 },
          { x: 250, y: 300, hasImage: true, imageSrc: sleepy, monster: true, width: 50, height: 50 },
          { x: 350, y: 200 },
          { x: 450, y: 300, hasImage: true, imageSrc: vomit, monster: true, width: 50, height: 50  },
          { x: 550, y: 400 },
          { x: 650, y: 500, hasImage: true, imageSrc: sleepy, monster: true, width: 50, height: 50   },
          { x: 750, y: 400 },
          { x: 850, y: 300, hasImage: true, imageSrc: vomit, monster: true, width: 50, height: 50  },
          { x: 950, y: 200 },
          { x: 1050, y: 300, hasImage: true, imageSrc: vomit, monster: true, width: 50, height: 50  },
          { x: 1150, y: 400 },
          { x: 1250, y: 500 },
        ],
        [
          { x: 50, y: 500 },
          { x: 150, y: 300 },
          { x: 250, y: 400, hasImage: true, imageSrc: dizzy, monster: true, width: 50, height: 50 },
          { x: 270, y: 700},
          { x: 370, y: 550},
          { x: 350, y: 200, hasImage: true, imageSrc: strech, monster: true, width: 50, height: 50 },
          { x: 450, y: 400 },
          { x: 550, y: 300 },
          { x: 650, y: 500, hasImage: true, imageSrc: dizzy, monster: true, width: 50, height: 50 },
          { x: 850, y: 700, hasImage: true, imageSrc: strech, monster: true, width: 50, height: 50 },
          { x: 1050, y: 450 },
          { x: 1200, y: 250 }
        ],
        [
          { x: 50, y: 500 },
          { x: 200, y: 300 },
          { x: 400, y: 250, hasImage: true, imageSrc: heartburn, monster: true, width: 50, height: 50 },
          { x: 600, y: 350 },
          { x: 800, y: 400, hasImage: true, imageSrc: bump, monster: true, width: 50, height: 50 },
          { x: 1000, y: 300 },
          { x: 1200, y: 500, hasImage: true, imageSrc: bump, monster: true, width: 50, height: 50 },
          { x: 1400, y: 300 },
          { x: 1600, y: 250 },
          { x: 1800, y: 350, hasImage: true, imageSrc: heartburn, monster: true, width: 50, height: 50 },
          { x: 2000, y: 400 },
          { x: 2200, y: 300, hasImage: true, imageSrc: bump, monster: true, width: 50, height: 50 },
          { x: 2400, y: 500 },
        ],
        [
          { x: 50, y: 500 },
          { x: 200, y: 300 },
          { x: 400, y: 250, hasImage: true, imageSrc: birth, monster: true, width: 50, height: 50 },
          { x: 600, y: 350 },
          { x: 800, y: 400, hasImage: true, imageSrc: birth, monster: true, width: 50, height: 50 },
          { x: 1000, y: 300 },
          { x: 1200, y: 500, hasImage: true, imageSrc: birth, monster: true, width: 50, height: 50 },
          { x: 1300, y: 300, hasImage: true, imageSrc: baby, baby: true, width: 50, height: 50  },
          { x: 1600, y: 400 },
          { x: 1700, y: 300 },
          { x: 1800, y: 500 },
          { x: 1900, y: 300 },
          { x: 2000, y: 250 },
          { x: 2100, y: 350 },
          { x: 2200, y: 400 },
          { x: 2300, y: 300 },
          { x: 2400, y: 500 },
        ],
      ];
      
      

      const platforms = levelsPlatforms[currentLevel - 1];

    useEffect(() => {
        const gameInterval = setInterval(() => {
        if (!gameOver) {
            // Apply gravity
            setPlayerVelocity((prev) => ({ ...prev, y: prev.y + gravity }));

            // Update player position
            setPlayerPosition((prev) => ({
            x: prev.x + playerVelocity.x,
            y: prev.y + playerVelocity.y,
            }));

            // Check for game over condition (missed jump)
            if (playerPosition.y >= window.innerHeight - platformHeight - 50) {
            setGameOver(true);
            }

            // Check for collisions with platforms
            platforms.forEach((platform) => {
            if (
                playerPosition.x < platform.x + platformWidth &&
                playerPosition.x + 50 > platform.x &&
                playerPosition.y < platform.y + platformHeight &&
                playerPosition.y + 50 > platform.y
            ) {
                // Player collided with platform
                setPlayerVelocity((prev) => ({ ...prev, y: 0 }));
                setPlayerPosition((prev) => ({ ...prev, y: platform.y - 50 }));
                setJumpCount(0); // Reset jump count when landing on the ground
            }
            });

            platforms.forEach((platform) => {
                if (
                  platform.monster &&
                  playerPosition.x < platform.x + platform.width &&
                  playerPosition.x + 50 > platform.x &&
                  playerPosition.y < platform.y + platform.height &&
                  playerPosition.y + 50 > platform.y
                ) {
                  setGameOver(true); // Set game over when colliding with monster
                }
                if (
                    platform.baby &&
                    playerPosition.x < platform.x + platform.width &&
                    playerPosition.x + 50 > platform.x &&
                    playerPosition.y < platform.y + platform.height &&
                    playerPosition.y + 50 > platform.y
                  ) {
                    setGameWin(true); // Set game over when colliding with baby
                  }
              });

            // Handle horizontal movement
            if (movingLeft) {
            setPlayerVelocity((prev) => ({ ...prev, x: -moveSpeed }));
            } else if (movingRight) {
            setPlayerVelocity((prev) => ({ ...prev, x: moveSpeed }));
            } else {
            setPlayerVelocity((prev) => ({ ...prev, x: 0 }));
            }
            if (playerPosition.x >= levelThreshold) {
                setCurrentLevel((prevLevel) => prevLevel + 1);
                setPlayerPosition({ x: 50, y: 200 });
                // Additional logic to load a new level (not implemented in this example)
              }
        }
        }, 1000 / 60); // Update every frame (60 FPS)

        return () => {
        clearInterval(gameInterval);
        };
    }, [playerVelocity, playerPosition, gameOver, platforms, movingLeft, movingRight, enemies]);

    let levelText = '';
  switch (currentLevel) {
    case 1:
      levelText = 'Journey through pregnancy, avoid the symptoms and make it to the baby';
      break;
    case 2:
      levelText = '1st trimester';
      break;
    case 3:
      levelText = '2nd trimester';
      break;
    case 4:
      levelText = '3rd trimester';
      break;
    case 5:
      levelText = 'Birth!';
      break;
    default:
      levelText = '';
  }

    const restartGame = () => {
        setPlayerPosition({ x: 50, y: 200 });
        setPlayerVelocity({ x: 0, y: 0 });
        setGameOver(false);
        setEnemies([]);
        setScore(0);
        setCurrentLevel(1)
    };

    const handleKeyDown = (event) => {
        if (!gameOver) {
        switch (event.key) {
            case 'ArrowLeft':
            setMovingLeft(true);
            break;
            case 'ArrowRight':
            setMovingRight(true);
            break;
            case 'ArrowUp':
            case ' ':
                if (jumpCount < maxJumpCount) {
                    setPlayerVelocity((prev) => ({ ...prev, y: jumpStrength }));
                    setJumpCount((prev) => prev + 1);
                  }
            break;
            default:
            break;
        }
        } else if (event.key === 'Enter') {
        restartGame();
        }
    };

    const handleKeyUp = (event) => {
        switch (event.key) {
        case 'ArrowLeft':
            setMovingLeft(false);
            break;
        case 'ArrowRight':
            setMovingRight(false);
            break;
        default:
            break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return (
        <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            backgroundColor: 'lightblue',
            overflow: 'hidden', // Hide scroll bars
        }}
        tabIndex="0"
        >
            <div
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            textAlign: 'center',
            }}
        >
            <h1>{levelText}</h1>
        </div>
        {/* Player */}
        {!gameOver && (
            <div
            style={{
                position: 'absolute',
                left: playerPosition.x,
                top: playerPosition.y,
                width: '50px',
                height: '50px',
                backgroundImage: `url(${playerSprite})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
            ></div>
        )}


        {/* Platforms */}
        {platforms.map((platform, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: platform.x,
            top: platform.y,
            width: platformWidth,
            height: platformHeight,
            backgroundColor: 'brown',
          }}
        >
          {platform.hasImage && <img src={platform.imageSrc} alt="Food" style={{ width: '100%', height: '300%' }} />}
          {/* {platform.monster && (
            <img src={vomit} alt="Monster" style={{ width: '50px', height: '50px' }} />
            )} */}
        </div>
      ))}

        {gameOver && (
            <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}
            >
            <h1>Game Over</h1>
            <p>Score: {score}</p>
            <button onClick={restartGame}>Restart</button>
            </div>
        )}
        {gameWin && (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    }}
  >
    <h1 style={{ color: 'green', fontSize: '2rem', marginBottom: '20px' }}>YOU WIN!</h1>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
      Congratulations on completing the journey through pregnancy and giving birth!
    </p>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
      Mickayla, I'm so proud of you and I know you will be a great mom.
    </p>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>HAPPY MOTHER'S DAY! I LOVE YOU!</p>
  </div>
)}

        </div>
    );
    };

    export default App;
