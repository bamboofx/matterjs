import React, { useEffect } from 'react';
import Matter from 'matter-js';
import $ from 'jquery';
import ballImage from './ballImage';
function startGame() {

  // Add your logic to start the game here
  var basketball = ballImage;

  var w = window.innerWidth;
  var h = window.innerHeight;
  var total = 2;

  //Random Number generator
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

  var engine = Engine.create();

  var render = Render.create({
    element: document.getElementById('game_container'),
    engine: engine,
    options: {
      width: w,
      height: h,
      wireframes: false,
      background: 'transparent'
    }
  });

  var basketOptions = {
    isStatic: true, render: {
      fillStyle: 'darkorange', strokeStyle: 'black'
    }
  };
  var netStyle = {
    render: {
      fillStyle: 'white', strokeStyle: 'black'
    }
  };

  //Extra thick so the frame rate doesn't allow it to escape
  var topWall = Bodies.rectangle(w / 2, -200, w, 400, { isStatic: true });
  var leftWall = Bodies.rectangle(-200, h / 2, 400, h, { isStatic: true });
  var rightWall = Bodies.rectangle(w + 200, h / 2, 400, h, { isStatic: true });
  var bottomWall = Bodies.rectangle(w / 2, h + 200, w, 400, { isStatic: true });

  var rim1 = Bodies.circle(w - 90, (h / 2 - (h / 12)), h / 120, basketOptions);
  var rim2 = Bodies.circle(90, (h / 2 - (h / 12)), h / 120, basketOptions);
  var rim3 = Bodies.circle(w - 5, (h / 2 - (h / 12)), h / 120, basketOptions);
  var rim4 = Bodies.circle(5, (h / 2 - (h / 12)), h / 120, basketOptions);
  var basketBottom1 = Bodies.rectangle(w - 45, (h / 2), 100, 8, basketOptions);
  var basketBottom2 = Bodies.rectangle(45, (h / 2), 100, 8, basketOptions);

  //right front net
  //stack(xx, yy, columns, rows, columnGap, rowGap, callback)
  var net1 = Composites.stack((w - 85), (h / 2 - (h / 12)), 7, 1, 1, 0, function (x, y) {
    return Bodies.circle(x, y, 4, netStyle);
  });
  //left front net
  var net2 = Composites.stack(95, (h / 2 - (h / 12)), 7, 1, 1, 0, function (x, y) {
    return Bodies.circle(x, y, 4, netStyle);
  });
  var net3 = Composites.stack((w - 5), (h / 2 - (h / 12)), 7, 1, 1, 0, function (x, y) {
    return Bodies.circle(x, y, 4, netStyle);
  });
  //left front net
  var net4 = Composites.stack(5, (h / 2 - (h / 12)), 7, 1, 1, 0, function (x, y) {
    return Bodies.circle(x, y, 4, netStyle);
  });

  //chain(composite, xOffsetA, yOffsetA, xOffsetB, yOffsetB, options)
  var chain = Composites.chain(net1, 0.5, 0, -0.5, 0, { stiffness: 1 });
  Composite.add(net1, Constraint.create({
    bodyA: net1.bodies[0],
    pointB: { x: (w - 90), y: (h / 2 - (h / 12)) },
    stiffness: 0.95
  }));

  var chain2 = Composites.chain(net2, 0.5, 0, -0.5, 0, { stiffness: 1 });
  Composite.add(net2, Constraint.create({
    bodyA: net2.bodies[0],
    pointB: { x: 90, y: (h / 2 - (h / 12)) },
    stiffness: 0.95
  }));

  var chain3 = Composites.chain(net3, 0.5, 0, -0.5, 0, { stiffness: 1 });
  Composite.add(net3, Constraint.create({
    bodyA: net3.bodies[0],
    pointB: { x: (w - 5), y: (h / 2 - (h / 12)) },
    stiffness: 0.95
  }));

  var chain4 = Composites.chain(net4, 0.5, 0, -0.5, 0, { stiffness: 1 });
  Composite.add(net4, Constraint.create({
    bodyA: net4.bodies[0],
    pointB: { x: 5, y: (h / 2 - (h / 12)) },
    stiffness: 0.95
  }));

  //var rectangle = Bodies.rectangle(x, y, w, h);

  var balls = [];

  for (var i = 0; i < total; ++i) {
    balls[i] = Bodies.circle(
      //start in the middle and randomly offset 20 in all directions
      w / 2 + random(-20, 20),
      h / 2 + random(-20, 20),
      35,
      {
        friction: 0.05,
        frictionAir: 0.006,
        restitution: 0.9,
        render: {
          sprite: {
            texture: basketball,
            xScale: 0.75,
            yScale: 0.75
          }
        }
      }
    );
  }

  //Adds the walls to the world
  World.add(engine.world, [
    topWall,
    leftWall,
    rightWall,
    bottomWall,
    rim1,
    rim2,
    rim3,
    rim4,
    basketBottom1,
    basketBottom2,
    chain,
    chain2,
    chain3,
    chain4
  ]);

  //Adds all the balls to the world
  for (var i = 0; i < total; ++i) {
    World.add(engine.world, [balls[i]]);
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  World.add(engine.world, mouseConstraint);

  Engine.run(engine);

  Render.run(render);

  function upAndRight() {
    for (var i = 0; i < total; ++i) {
      Body.setAngularVelocity(balls[i], Math.PI / random(-6, -3));
      Body.setVelocity(balls[i], { x: random(8, 10), y: (-h / 50) });
    }
  }

  function upAndLeft() {
    for (var i = 0; i < total; ++i) {
      Body.setAngularVelocity(balls[i], Math.PI / random(3, 6));
      Body.setVelocity(balls[i], { x: random(-10, -8), y: (-h / 50) });
    }
  }

  function uppity() {
    for (var i = 0; i < total; ++i) {
      Body.setVelocity(balls[i], { x: 0, y: (-h / 50) });
    }
  }

  function downity() {
    for (var i = 0; i < total; ++i) {
      Body.setVelocity(balls[i], { x: 0, y: (h / 50) });
    }
  }

  function randomize() {
    for (var i = 0; i < total; ++i) {
      Body.setVelocity(balls[i], { x: random(-20, 20), y: random(-20, 0) });
      Body.setAngularVelocity(balls[i], Math.PI / random(3, 6));
    }
  }

  //positive multiplier spins right, negative spins left
  var mul = 1;

  $(document).keydown(function (e) {
    switch (e.which) {
      case 37: // left arrow button
        upAndLeft();
        break;

      case 38: // up arrow button
        uppity();
        break;

      case 39: // right arrow button
        upAndRight();
        break;

      case 40: // down
        downity();
        break;

      case 32: // down
        randomize();
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (`scro`ll / move caret)
  });//

  $("#right").on({ 'click': function () { upAndRight(); } });
  $("#left").on({ 'click': function () { upAndLeft(); } });
  console.log("Game starteddasdasdasdasd");
}
const PhysicsComponent = () => {


  useEffect(() => {
  }, []);

  return (
    <div id="physics-world">
      <section id="game_container">
        <div id="score">0</div>
      </section>
      <div id="right" className="rim right"></div>
      <div id="left" className="rim left"></div>
    </div>
  );

};
export { startGame}

export default PhysicsComponent;