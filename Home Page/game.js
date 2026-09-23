/* =========================================
   GAME SELECTOR
========================================= */

const missionCards =
  document.querySelectorAll(".mission-card");

const gamePanels =
  document.querySelectorAll(".game-panel");


missionCards.forEach(card => {

  card.addEventListener("click", () => {

    const game =
      card.dataset.game;

    missionCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    gamePanels.forEach(panel => {

      panel.classList.remove("active-panel");

      if (panel.id === game) {
        panel.classList.add("active-panel");
      }

    });

  });

});



/* =========================================
   PLANET RUN
========================================= */

const canvas =
  document.getElementById("rocketCanvas");

const ctx =
  canvas.getContext("2d");


const startButton =
  document.getElementById("rocketStart");

const resetButton =
  document.getElementById("rocketReset");

const message =
  document.getElementById("rocketMessage");

const scoreElement =
  document.getElementById("rocketScore");

const sideScore =
  document.getElementById("sideScore");

const planetCountElement =
  document.getElementById("planetCount");

const distanceElement =
  document.getElementById("rocketDistance");

const statusElement =
  document.getElementById("rocketStatus");


const WIDTH = 720;
const HEIGHT = 600;

const GRID = 30;

const COLUMNS =
  WIDTH / GRID;

const ROWS =
  HEIGHT / GRID;


let gameRunning = false;

let gameLoop;

let score = 0;

let collected = 0;

let distance = 0;

let direction = {
  x: 1,
  y: 0
};

let nextDirection = {
  x: 1,
  y: 0
};


let rocket = [];


let planet = {
  x: 15,
  y: 10,
  type: "earth"
};


let debris = [];


let backgroundStars = [];



/* =========================================
   STAR FIELD
========================================= */

function createStars() {

  backgroundStars = [];

  for (let i = 0; i < 130; i++) {

    backgroundStars.push({

      x:
        Math.random() * WIDTH,

      y:
        Math.random() * HEIGHT,

      size:
        Math.random() * 1.5 + .2,

      opacity:
        Math.random() * .7 + .2

    });

  }

}



/* =========================================
   SPACE DEBRIS
========================================= */

function createDebris() {

  debris = [];

  for (let i = 0; i < 7; i++) {

    debris.push({

      x:
        Math.floor(
          Math.random() * COLUMNS
        ),

      y:
        Math.floor(
          Math.random() * ROWS
        ),

      size:
        Math.random() * 5 + 5,

      rotation:
        Math.random() * Math.PI

    });

  }

}



/* =========================================
   PLANET TYPES
========================================= */

const planetTypes = [

  "earth",

  "mars",

  "jupiter",

  "saturn",

  "neptune"

];



function createPlanet() {

  let position;

  do {

    position = {

      x:
        Math.floor(
          Math.random() * (COLUMNS - 2)
        ) + 1,

      y:
        Math.floor(
          Math.random() * (ROWS - 2)
        ) + 1

    };

  } while (
    rocket.some(
      part =>
        part.x === position.x &&
        part.y === position.y
    )
  );


  planet = {

    ...position,

    type:
      planetTypes[
        Math.floor(
          Math.random() *
          planetTypes.length
        )
      ]

  };

}



/* =========================================
   RESET
========================================= */

function resetRocketGame() {

  gameRunning = false;

  cancelAnimationFrame(gameLoop);


  score = 0;

  collected = 0;

  distance = 0;


  direction = {
    x: 1,
    y: 0
  };


  nextDirection = {
    x: 1,
    y: 0
  };


  rocket = [

    {
      x: 8,
      y: 10
    },

    {
      x: 7,
      y: 10
    },

    {
      x: 6,
      y: 10
    }

  ];


  createStars();

  createDebris();

  createPlanet();


  message.classList.remove("hidden");

  message.querySelector("h3").textContent =
    "PLANET RUN";

  message.querySelector("p").textContent =
    "Use the arrow keys or WASD. Collect planets and avoid space debris.";

  startButton.textContent =
    "Launch Mission";


  statusElement.textContent =
    "STANDBY";


  updateUI();

  draw();

}



/* =========================================
   START
========================================= */

function startRocketGame() {

  resetRocketGame();

  message.classList.add("hidden");

  gameRunning = true;

  statusElement.textContent =
    "ACTIVE";


  gameLoop =
    requestAnimationFrame(
      loop
    );

}



/* =========================================
   UI
========================================= */

function updateUI() {

  scoreElement.textContent =
    score;

  sideScore.textContent =
    score;

  planetCountElement.textContent =
    collected;

  distanceElement.textContent =
    Math.floor(distance) +
    " km";

}



/* =========================================
   DRAW BACKGROUND
========================================= */

function drawBackground() {

  const gradient =
    ctx.createRadialGradient(
      WIDTH / 2,
      HEIGHT / 2,
      20,
      WIDTH / 2,
      HEIGHT / 2,
      WIDTH
    );


  gradient.addColorStop(
    0,
    "#0c1624"
  );


  gradient.addColorStop(
    .55,
    "#040912"
  );


  gradient.addColorStop(
    1,
    "#010205"
  );


  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );


  backgroundStars.forEach(star => {

    ctx.globalAlpha =
      star.opacity;

    ctx.fillStyle =
      "#dce6f5";

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });


  ctx.globalAlpha = 1;



  /* distant planet */

  ctx.globalAlpha = .12;

  ctx.fillStyle =
    "#627aa1";

  ctx.beginPath();

  ctx.arc(
    650,
    80,
    90,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.globalAlpha = 1;

}



/* =========================================
   DRAW PLANET
========================================= */

function drawPlanet() {

  const x =
    planet.x * GRID +
    GRID / 2;

  const y =
    planet.y * GRID +
    GRID / 2;


  ctx.save();

  ctx.translate(x, y);


  let color =
    "#3e8ed0";


  if (planet.type === "mars") {
    color = "#a64f3d";
  }

  if (planet.type === "jupiter") {
    color = "#bd9565";
  }

  if (planet.type === "saturn") {
    color = "#c9ad72";
  }

  if (planet.type === "neptune") {
    color = "#4268a8";
  }


  /* glow */

  ctx.shadowBlur = 20;

  ctx.shadowColor =
    color;


  ctx.fillStyle =
    color;


  ctx.beginPath();

  ctx.arc(
    0,
    0,
    11,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.shadowBlur = 0;


  /* Earth */

  if (planet.type === "earth") {

    ctx.fillStyle =
      "#58a86b";

    ctx.beginPath();

    ctx.arc(
      -3,
      -2,
      4,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }


  /* Saturn rings */

  if (planet.type === "saturn") {

    ctx.strokeStyle =
      "#d8c58e";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.ellipse(
      0,
      0,
      18,
      6,
      -.25,
      0,
      Math.PI * 2
    );

    ctx.stroke();

  }


  ctx.restore();

}



/* =========================================
   DRAW DEBRIS
========================================= */

function drawDebris() {

  debris.forEach(rock => {

    const x =
      rock.x * GRID +
      GRID / 2;

    const y =
      rock.y * GRID +
      GRID / 2;


    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(
      rock.rotation
    );


    ctx.fillStyle =
      "#555c66";


    ctx.beginPath();

    ctx.moveTo(
      -7,
      -5
    );

    ctx.lineTo(
      5,
      -7
    );

    ctx.lineTo(
      8,
      3
    );

    ctx.lineTo(
      2,
      8
    );

    ctx.lineTo(
      -7,
      5
    );

    ctx.closePath();

    ctx.fill();


    ctx.restore();

  });

}



/* =========================================
   DRAW ROCKET
========================================= */

function drawRocket() {

  rocket.forEach(
    (part, index) => {

      const x =
        part.x * GRID +
        GRID / 2;

      const y =
        part.y * GRID +
        GRID / 2;


      if (index === 0) {

        drawRocketHead(
          x,
          y
        );

      } else {

        ctx.fillStyle =
          index % 2 === 0
            ? "#c5cbd2"
            : "#929aa3";


        ctx.beginPath();

        ctx.arc(
          x,
          y,
          9,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }

    }
  );

}



/* =========================================
   ROCKET HEAD
========================================= */

function drawRocketHead(
  x,
  y
) {

  ctx.save();

  ctx.translate(
    x,
    y
  );


  let angle = 0;


  if (direction.x === 1)
    angle = 0;

  if (direction.x === -1)
    angle = Math.PI;

  if (direction.y === 1)
    angle = Math.PI / 2;

  if (direction.y === -1)
    angle = -Math.PI / 2;


  ctx.rotate(angle);


  /* engine flame */

  ctx.fillStyle =
    "#d59b3d";


  ctx.beginPath();

  ctx.moveTo(
    -13,
    0
  );

  ctx.lineTo(
    -25,
    -5
  );

  ctx.lineTo(
    -20,
    0
  );

  ctx.lineTo(
    -25,
    5
  );

  ctx.closePath();

  ctx.fill();


  /* rocket */

  ctx.fillStyle =
    "#e1e4e8";


  ctx.beginPath();

  ctx.moveTo(
    14,
    0
  );

  ctx.lineTo(
    -8,
    -9
  );

  ctx.lineTo(
    -6,
    9
  );

  ctx.closePath();

  ctx.fill();


  /* window */

  ctx.fillStyle =
    "#47799a";


  ctx.beginPath();

  ctx.arc(
    3,
    0,
    4,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.restore();

}



/* =========================================
   DRAW
========================================= */

function draw() {

  drawBackground();

  drawDebris();

  drawPlanet();

  drawRocket();

}



/* =========================================
   COLLISION
========================================= */

function checkCollision() {

  const head =
    rocket[0];


  /* walls */

  if (

    head.x < 0 ||

    head.x >= COLUMNS ||

    head.y < 0 ||

    head.y >= ROWS

  ) {

    return true;

  }


  /* own trail */

  for (
    let i = 1;
    i < rocket.length;
    i++
  ) {

    if (

      head.x === rocket[i].x &&

      head.y === rocket[i].y

    ) {

      return true;

    }

  }


  /* debris */

  for (
    const rock of debris
  ) {

    if (

      head.x === rock.x &&

      head.y === rock.y

    ) {

      return true;

    }

  }


  return false;

}



/* =========================================
   UPDATE
========================================= */

function update() {

  direction =
    nextDirection;


  const head = {

    x:
      rocket[0].x +
      direction.x,

    y:
      rocket[0].y +
      direction.y

  };


  rocket.unshift(head);


  /* planet collected */

  if (

    head.x === planet.x &&

    head.y === planet.y

  ) {

    score += 100;

    collected++;

    distance += 250;


    createPlanet();


    /* add new debris */

    if (
      collected % 3 === 0
    ) {

      debris.push({

        x:
          Math.floor(
            Math.random() *
            COLUMNS
          ),

        y:
          Math.floor(
            Math.random() *
            ROWS
          ),

        size:
          Math.random() * 5 + 5,

        rotation:
          Math.random() * Math.PI

      });

    }

  } else {

    rocket.pop();

  }


  distance += 5;


  updateUI();


  if (
    checkCollision()
  ) {

    endGame();

  }

}



/* =========================================
   GAME LOOP
========================================= */

let lastMove = 0;

const gameSpeed = 115;


function loop(time) {

  if (!gameRunning)
    return;


  if (
    time - lastMove >
    gameSpeed
  ) {

    update();

    draw();

    lastMove = time;

  }


  gameLoop =
    requestAnimationFrame(
      loop
    );

}



/* =========================================
   GAME OVER
========================================= */

function endGame() {

  gameRunning = false;


  statusElement.textContent =
    "MISSION FAILED";


  message.classList.remove(
    "hidden"
  );


  message.querySelector("h3")
    .textContent =
    "MISSION COMPLETE";


  message.querySelector("p")
    .textContent =
    `You explored ${collected} planets and scored ${score} points.`;


  startButton.textContent =
    "Fly Again";

}



/* =========================================
   CONTROLS
========================================= */

document.addEventListener(
  "keydown",
  event => {

    const key =
      event.key.toLowerCase();


    if (
      (
        key === "arrowup" ||
        key === "w"
      ) &&
      direction.y !== 1
    ) {

      nextDirection = {
        x: 0,
        y: -1
      };

    }


    if (
      (
        key === "arrowdown" ||
        key === "s"
      ) &&
      direction.y !== -1
    ) {

      nextDirection = {
        x: 0,
        y: 1
      };

    }


    if (
      (
        key === "arrowleft" ||
        key === "a"
      ) &&
      direction.x !== 1
    ) {

      nextDirection = {
        x: -1,
        y: 0
      };

    }


    if (
      (
        key === "arrowright" ||
        key === "d"
      ) &&
      direction.x !== -1
    ) {

      nextDirection = {
        x: 1,
        y: 0
      };

    }

  }
);


startButton.addEventListener(
  "click",
  startRocketGame
);


resetButton.addEventListener(
  "click",
  resetRocketGame
);



/* =========================================
   SOLAR SYSTEM QUIZ
========================================= */

const questions = [

  {
    question:
      "Which planet is closest to the Sun?",

    answers: [
      "Venus",
      "Mercury",
      "Mars",
      "Earth"
    ],

    correct: 1
  },


  {
    question:
      "Which planet is known for its large ring system?",

    answers: [
      "Jupiter",
      "Uranus",
      "Saturn",
      "Neptune"
    ],

    correct: 2
  },


  {
    question:
      "Which planet is the largest in the Solar System?",

    answers: [
      "Earth",
      "Saturn",
      "Jupiter",
      "Neptune"
    ],

    correct: 2
  },


  {
    question:
      "Which planet is known as the Red Planet?",

    answers: [
      "Mars",
      "Venus",
      "Mercury",
      "Jupiter"
    ],

    correct: 0
  },


  {
    question:
      "Which planet is farthest from the Sun?",

    answers: [
      "Uranus",
      "Saturn",
      "Neptune",
      "Mars"
    ],

    correct: 2
  },


  {
    question:
      "Which planet has liquid water covering much of its surface?",

    answers: [
      "Earth",
      "Venus",
      "Mars",
      "Mercury"
    ],

    correct: 0
  },


  {
    question:
      "What is the Sun?",

    answers: [
      "A planet",
      "A moon",
      "A star",
      "An asteroid"
    ],

    correct: 2
  },


  {
    question:
      "Which planet rotates almost on its side?",

    answers: [
      "Uranus",
      "Neptune",
      "Venus",
      "Mars"
    ],

    correct: 0
  },


  {
    question:
      "Which planet has the Great Red Spot?",

    answers: [
      "Mars",
      "Jupiter",
      "Saturn",
      "Venus"
    ],

    correct: 1
  },


  {
    question:
      "How many planets are officially recognized in our Solar System?",

    answers: [
      "7",
      "8",
      "9",
      "10"
    ],

    correct: 1
  }

];


let currentQuestion = 0;

let quizScore = 0;

let questionAnswered = false;


const questionElement =
  document.getElementById(
    "question"
  );


const answersElement =
  document.getElementById(
    "answers"
  );


const questionCount =
  document.getElementById(
    "questionCount"
  );


const quizScoreElement =
  document.getElementById(
    "quizScore"
  );


const quizFeedback =
  document.getElementById(
    "quizFeedback"
  );


const nextQuestion =
  document.getElementById(
    "nextQuestion"
  );


function loadQuestion() {

  const q =
    questions[currentQuestion];


  questionAnswered = false;


  questionCount.textContent =
    `QUESTION ${currentQuestion + 1} / ${questions.length}`;


  questionElement.textContent =
    q.question;


  answersElement.innerHTML = "";


  q.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer";


      button.textContent =
        answer;


      button.addEventListener(
        "click",
        () =>
          answerQuestion(
            index,
            button
          )
      );


      answersElement.appendChild(
        button
      );

    }
  );


  quizFeedback.textContent =
    "Select an answer.";


  nextQuestion.disabled =
    true;

}


function answerQuestion(
  selected,
  button
) {

  if (questionAnswered)
    return;


  questionAnswered = true;


  const q =
    questions[currentQuestion];


  const buttons =
    answersElement.querySelectorAll(
      ".answer"
    );


  buttons.forEach(
    item => {
      item.disabled = true;
    }
  );


  if (
    selected === q.correct
  ) {

    button.classList.add(
      "correct"
    );


    quizScore += 100;


    quizFeedback.textContent =
      "Correct.";

  } else {

    button.classList.add(
      "wrong"
    );


    buttons[
      q.correct
    ].classList.add(
      "correct"
    );


    quizFeedback.textContent =
      "Incorrect.";

  }


  quizScoreElement.textContent =
    quizScore;


  nextQuestion.disabled =
    false;

}


nextQuestion.addEventListener(
  "click",
  () => {

    currentQuestion++;


    if (
      currentQuestion >=
      questions.length
    ) {

      questionElement.textContent =
        `Mission complete. Final score: ${quizScore} / ${questions.length * 100}.`;


      answersElement.innerHTML =
        "";


      quizFeedback.textContent =
        "You have completed the Solar System quiz.";


      nextQuestion.textContent =
        "Restart Quiz";


      currentQuestion = 0;


      nextQuestion.disabled =
        false;


      return;

    }


    loadQuestion();

  }
);


nextQuestion.addEventListener(
  "click",
  () => {

    if (
      nextQuestion.textContent ===
      "Restart Quiz"
    ) {

      quizScore = 0;


      quizScoreElement.textContent =
        "0";


      nextQuestion.textContent =
        "Next Question";


      loadQuestion();

    }

  }
);



/* =========================================
   INITIALIZE
========================================= */

resetRocketGame();

loadQuestion();