// ==============================
// STATE
// ==============================
let steps = [];
let currentStep = 0;
let animationId = null;

// ==============================
// DOM REFERENCES
// ==============================
const svg = document.getElementById("scene");
const explanation = document.getElementById("explanation");
const stepCount = document.getElementById("step-count");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// ==============================
// LOAD STEPS
// ==============================
fetch("steps.json")
  .then(res => res.json())
  .then(data => {
    steps = data.steps;
    renderStep();
  })
  .catch(err => {
    explanation.innerText = "Failed to load steps.json";
    console.error(err);
  });

// ==============================
// BUTTON HANDLERS
// ==============================
nextBtn.onclick = () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  }
};

prevBtn.onclick = () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
};

// ==============================
// MAIN RENDER
// ==============================
function renderStep() {
  const step = steps[currentStep];
  explanation.innerText = step.text;
  stepCount.innerText = `Step ${currentStep + 1} of ${steps.length}`;
  drawVisual(step.visual);
}

// ==============================
// SVG HELPERS
// ==============================
function clearSVG() {
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;

  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
}

function drawCar(x, y, color) {
  const car = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  car.setAttribute("x", x);
  car.setAttribute("y", y);
  car.setAttribute("width", 80);
  car.setAttribute("height", 40);
  car.setAttribute("rx", 6);
  car.setAttribute("fill", color);
  svg.appendChild(car);
  return car;
}

function drawArrow(x1, y1, x2, y2) {
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow.setAttribute("x1", x1);
  arrow.setAttribute("y1", y1);
  arrow.setAttribute("x2", x2);
  arrow.setAttribute("y2", y2);
  arrow.setAttribute("stroke", "black");
  arrow.setAttribute("stroke-width", "4");
  arrow.setAttribute("marker-end", "url(#arrowhead)");
  svg.appendChild(arrow);
}

// ==============================
// DEFINITIONS (arrowhead)
// ==============================
(function defineArrowHead() {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");

  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "10");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");

  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
  polygon.setAttribute("fill", "black");

  marker.appendChild(polygon);
  defs.appendChild(marker);
  svg.appendChild(defs);
})();

// ==============================
// ANIMATIONS
// ==============================

// 🚗 Momentum exists
function animateMovingCar() {
  clearSVG();
  let x = 40;
  const car = drawCar(x, 130, "#2563eb");

  function move() {
    x += 2;
    car.setAttribute("x", x);
    if (x < 280) {
      animationId = requestAnimationFrame(move);
    }
  }

  drawArrow(140, 150, 220, 150); // momentum arrow
  move();
}

// 💥 Collision (sudden stop)
function animateCollision() {
  clearSVG();
  let x = 120;

  const car1 = drawCar(x, 130, "#2563eb");
  const car2 = drawCar(300, 130, "#dc2626");

  function move() {
    x += 4;
    car1.setAttribute("x", x);
    if (x < 220) {
      animationId = requestAnimationFrame(move);
    }
  }

  move();
}

// 🛑 Abrupt stop
function animateStoppingFast() {
  clearSVG();
  let x = 200;
  let speed = 6;

  const car = drawCar(x, 130, "#2563eb");

  function move() {
    if (speed > 0) {
      x += speed;
      speed -= 0.7;
      car.setAttribute("x", x);
      animationId = requestAnimationFrame(move);
    }
  }

  move();
}

// 🛡️ Same momentum change, slower stop
function animateStoppingSlow() {
  clearSVG();
  let x = 200;
  let speed = 3;

  const car = drawCar(x, 130, "#2563eb");

  function move() {
    if (speed > 0) {
      x += speed;
      speed -= 0.08;
      car.setAttribute("x", x);
      animationId = requestAnimationFrame(move);
    }
  }

  move();
}

// ==============================
// VISUAL ROUTER
// ==============================
function drawVisual(type) {
  if (type === "moving_car") animateMovingCar();
  if (type === "collision") animateCollision();
  if (type === "stopping") animateStoppingFast();
  if (type === "impulse") animateStoppingSlow();
}
