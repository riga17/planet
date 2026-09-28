const $ = id => document.getElementById(id);
const all = sel => document.querySelectorAll(sel);

all(".mission-card").forEach(card => card.onclick = () => {
  all(".mission-card").forEach(x => x.classList.remove("active"));
  all(".game-panel").forEach(x => x.classList.remove("active-panel"));
  card.classList.add("active");
  $(card.dataset.game)?.classList.add("active-panel");
});


const canvas = $("rocketCanvas"), ctx = canvas.getContext("2d");
const startBtn = $("rocketStart"), resetBtn = $("rocketReset");
const msg = $("rocketMessage"), scoreEl = $("rocketScore");
const sideScore = $("sideScore"), planetsEl = $("planetCount");
const distanceEl = $("rocketDistance"), statusEl = $("rocketStatus");

const W = 720, H = 600, GRID = 30;
const COLS = W / GRID, ROWS = H / GRID;
const planetTypes = ["earth","mars","jupiter","saturn","neptune"];

let running = false, animation, score = 0, collected = 0, distance = 0;
let dir = {x:1,y:0}, nextDir = {x:1,y:0};
let rocket = [], planet = {}, debris = [], stars = [];

function starsCreate() {
  stars = Array.from({length:130}, () => ({
    x:Math.random()*W,
    y:Math.random()*H,
    size:Math.random()*1.5+.2,
    opacity:Math.random()*.7+.2
  }));
}

function debrisCreate() {
  debris = Array.from({length:7}, () => ({
    x:Math.floor(Math.random()*COLS),
    y:Math.floor(Math.random()*ROWS),
    size:Math.random()*5+5,
    rotation:Math.random()*Math.PI
  }));
}

function planetCreate() {
  let p;
  do {
    p = {
      x:Math.floor(Math.random()*(COLS-2))+1,
      y:Math.floor(Math.random()*(ROWS-2))+1
    };
  } while (rocket.some(r => r.x === p.x && r.y === p.y));

  planet = {...p,type:planetTypes[Math.floor(Math.random()*planetTypes.length)]};
}

function resetRocketGame() {
  running = false;
  cancelAnimationFrame(animation);
  score = collected = distance = 0;
  dir = nextDir = {x:1,y:0};

  rocket = [{x:8,y:10},{x:7,y:10},{x:6,y:10}];

  starsCreate();
  debrisCreate();
  planetCreate();

  msg.classList.remove("hidden");
  msg.querySelector("h3").textContent = "PLANET RUN";
  msg.querySelector("p").textContent =
    "Use the arrow keys or WASD. Collect planets and avoid space debris.";
  startBtn.textContent = "Launch Mission";
  statusEl.textContent = "STANDBY";

  updateUI();
  draw();
}

function startRocketGame() {
  resetRocketGame();
  msg.classList.add("hidden");
  running = true;
  statusEl.textContent = "ACTIVE";
  animation = requestAnimationFrame(loop);
}

function updateUI() {
  scoreEl.textContent = sideScore.textContent = score;
  planetsEl.textContent = collected;
  distanceEl.textContent = Math.floor(distance) + " km";
}

function background() {
  const g = ctx.createRadialGradient(W/2,H/2,20,W/2,H/2,W);
  g.addColorStop(0,"#0c1624");
  g.addColorStop(.55,"#040912");
  g.addColorStop(1,"#010205");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  stars.forEach(s => {
    ctx.globalAlpha = s.opacity;
    ctx.fillStyle = "#dce6f5";
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fill();
  });

  ctx.globalAlpha = .12;
  ctx.fillStyle = "#627aa1";
  ctx.beginPath();
  ctx.arc(650,80,90,0,Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawPlanet() {
  const x = planet.x*GRID+GRID/2, y = planet.y*GRID+GRID/2;
  const colors = {
    earth:"#3e8ed0", mars:"#a64f3d", jupiter:"#bd9565",
    saturn:"#c9ad72", neptune:"#4268a8"
  };
  const c = colors[planet.type];

  ctx.save();
  ctx.translate(x,y);
  ctx.shadowBlur = 20;
  ctx.shadowColor = c;
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(0,0,11,0,Math.PI*2);
  ctx.fill();
  ctx.shadowBlur = 0;

  if (planet.type === "earth") {
    ctx.fillStyle="#58a86b";
    ctx.beginPath();
    ctx.arc(-3,-2,4,0,Math.PI*2);
    ctx.fill();
  }

  if (planet.type === "saturn") {
    ctx.strokeStyle="#d8c58e";
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.ellipse(0,0,18,6,-.25,0,Math.PI*2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawDebris() {
  debris.forEach(r => {
    ctx.save();
    ctx.translate(r.x*GRID+GRID/2,r.y*GRID+GRID/2);
    ctx.rotate(r.rotation);
    ctx.fillStyle="#555c66";
    ctx.beginPath();
    ctx.moveTo(-7,-5);
    ctx.lineTo(5,-7);
    ctx.lineTo(8,3);
    ctx.lineTo(2,8);
    ctx.lineTo(-7,5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
}

function drawRocket() {
  rocket.forEach((p,i) => {
    const x=p.x*GRID+GRID/2, y=p.y*GRID+GRID/2;

    if (!i) return drawHead(x,y);

    ctx.fillStyle=i%2?"#929aa3":"#c5cbd2";
    ctx.beginPath();
    ctx.arc(x,y,9,0,Math.PI*2);
    ctx.fill();
  });
}

function drawHead(x,y) {
  let angle = dir.x===1 ? 0 : dir.x===-1 ? Math.PI :
              dir.y===1 ? Math.PI/2 : -Math.PI/2;

  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(angle);

  ctx.fillStyle="#d59b3d";
  ctx.beginPath();
  ctx.moveTo(-13,0);
  ctx.lineTo(-25,-5);
  ctx.lineTo(-20,0);
  ctx.lineTo(-25,5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle="#e1e4e8";
  ctx.beginPath();
  ctx.moveTo(14,0);
  ctx.lineTo(-8,-9);
  ctx.lineTo(-6,9);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle="#47799a";
  ctx.beginPath();
  ctx.arc(3,0,4,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

function draw() {
  background();
  drawDebris();
  drawPlanet();
  drawRocket();
}

function collision() {
  const h = rocket[0];

  if (h.x<0 || h.x>=COLS || h.y<0 || h.y>=ROWS) return true;

  if (rocket.slice(1).some(p => p.x===h.x && p.y===h.y)) return true;
  return debris.some(r => r.x===h.x && r.y===h.y);
}

function update() {
  dir = nextDir;

  const head = {
    x:rocket[0].x+dir.x,
    y:rocket[0].y+dir.y
  };

  rocket.unshift(head);

  if (head.x===planet.x && head.y===planet.y) {
    score+=100;
    collected++;
    distance+=250;
    planetCreate();

    if (collected%3===0)
      debris.push({
        x:Math.floor(Math.random()*COLS),
        y:Math.floor(Math.random()*ROWS),
        size:Math.random()*5+5,
        rotation:Math.random()*Math.PI
      });
  } else rocket.pop();

  distance+=5;
  updateUI();

  if (collision()) endGame();
}

let lastMove=0;

function loop(time) {
  if (!running) return;

  if (time-lastMove>115) {
    update();
    draw();
    lastMove=time;
  }

  animation=requestAnimationFrame(loop);
}

function endGame() {
  running=false;
  statusEl.textContent="MISSION FAILED";
  msg.classList.remove("hidden");
  msg.querySelector("h3").textContent="MISSION COMPLETE";
  msg.querySelector("p").textContent =
    `You explored ${collected} planets and scored ${score} points.`;
  startBtn.textContent="Fly Again";
}

document.addEventListener("keydown", e => {
  const k=e.key.toLowerCase();
  const keys={
    arrowup:{x:0,y:-1},w:{x:0,y:-1},
    arrowdown:{x:0,y:1},s:{x:0,y:1},
    arrowleft:{x:-1,y:0},a:{x:-1,y:0},
    arrowright:{x:1,y:0},d:{x:1,y:0}
  };

  const d=keys[k];
  if (!d) return;

  if (d.x && d.x===-dir.x || d.y && d.y===-dir.y) return;
  nextDir=d;
});

startBtn.onclick=startRocketGame;
resetBtn.onclick=resetRocketGame;


const questions=[
  ["Which planet is closest to the Sun?",["Venus","Mercury","Mars","Earth"],1],
  ["Which planet is known for its large ring system?",["Jupiter","Uranus","Saturn","Neptune"],2],
  ["Which planet is the largest in the Solar System?",["Earth","Saturn","Jupiter","Neptune"],2],
  ["Which planet is known as the Red Planet?",["Mars","Venus","Mercury","Jupiter"],0],
  ["Which planet is farthest from the Sun?",["Uranus","Saturn","Neptune","Mars"],2],
  ["Which planet has liquid water covering much of its surface?",["Earth","Venus","Mars","Mercury"],0],
  ["What is the Sun?",["A planet","A moon","A star","An asteroid"],2],
  ["Which planet rotates almost on its side?",["Uranus","Neptune","Venus","Mars"],0],
  ["Which planet has the Great Red Spot?",["Mars","Jupiter","Saturn","Venus"],1],
  ["How many planets are officially recognized in our Solar System?",["7","8","9","10"],1]
];

let qIndex=0, quizScore=0, answered=false;

const question=$("question");
const answers=$("answers");
const qCount=$("questionCount");
const qScore=$("quizScore");
const feedback=$("quizFeedback");
const next=$("nextQuestion");

function loadQuestion() {
  const q=questions[qIndex];
  answered=false;

  qCount.textContent=`QUESTION ${qIndex+1} / ${questions.length}`;
  question.textContent=q[0];
  answers.innerHTML="";

  q[1].forEach((answer,i)=>{
    const b=document.createElement("button");
    b.className="answer";
    b.textContent=answer;
    b.onclick=()=>answerQuestion(i,b);
    answers.appendChild(b);
  });

  feedback.textContent="Select an answer.";
  next.disabled=true;
  next.textContent="Next Question";
}

function answerQuestion(selected,button) {
  if(answered)return;
  answered=true;

  const q=questions[qIndex];
  const buttons=answers.querySelectorAll(".answer");

  buttons.forEach(b=>b.disabled=true);

  if(selected===q[2]){
    button.classList.add("correct");
    quizScore+=100;
    feedback.textContent="Correct.";
  }else{
    button.classList.add("wrong");
    buttons[q[2]].classList.add("correct");
    feedback.textContent="Incorrect.";
  }

  qScore.textContent=quizScore;
  next.disabled=false;
}

next.onclick=()=>{
  if(next.textContent==="Restart Quiz"){
    quizScore=0;
    qScore.textContent=0;
    qIndex=0;
    loadQuestion();
    return;
  }

  qIndex++;

  if(qIndex>=questions.length){
    question.textContent=
      `Mission complete. Final score: ${quizScore} / ${questions.length*100}.`;
    answers.innerHTML="";
    feedback.textContent="You have completed the Solar System quiz.";
    next.textContent="Restart Quiz";
    next.disabled=false;
    return;
  }

  loadQuestion();
};


resetRocketGame();
loadQuestion();
