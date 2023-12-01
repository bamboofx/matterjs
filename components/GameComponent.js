import React, { useEffect } from 'react';

import PlayerComponent from './PlayerComponent';
import PhysicsComponent, { startGame } from './PhysicsComponent';

const GameComponent = () => {

  useEffect(() => {

  }, []);

  function startGameHandler() {
    // Add your logic to start the game here
    console.log("Game started");
    startGame();
    document.getElementById("physics-world").style.display = "block";

    const fetchData = async () => {
      try {
        const response = await fetch('api/shortcut');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData()

  }


  return (
    <div>

      <section className="splash-container">
        <h1 className="splash-title">Welcome to My Game </h1>


        <div className="splash-buttons">
          <button className="splash-button" onClick={startGameHandler}>Start Game</button>
          &nbsp;
          <button id="abc" style={{ display: "none" }} className="splash-button" >Add to Home Screen</button>
        </div>

      </section>
      <PlayerComponent />
      <PhysicsComponent />
    </div>
  );
};

export default GameComponent;