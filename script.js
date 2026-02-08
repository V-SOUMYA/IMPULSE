let steps = [];
let currentStep = 0;

const svg = document.getElementById("scene");
const explanation = document.getElementById("explanation");
const stepCount = document.getElementById("step-count");

fetch("steps.json")
  .then(res => res.json())
  .then(data => {
    steps = data.steps;
    renderStep();
  });

document.getElementById("next").onclick = () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
  }
};

document.getElementById("prev").onclick = () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
};

function renderStep() {
  const step = steps[currentStep];
  explanation.innerText = step.text;
  stepCount.innerText = `Step ${currentStep + 1} of ${steps.length}`;
  drawVisual(step.visual);
}

function clearSVG() {
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
  car.setAttribute("fill", color);
  svg.appendChild(car);
}

function drawArrow(x1, y1, x2, y2) {
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow.setAttribute("x1", x1);
  arrow.setAttribute("y1", y1);
  arrow.setAttribute("x2", x2);
  arrow.setAttribute("y2", y2);
  arrow.setAttribute("stroke", "black");
  arrow.setAttribute("stroke-width", "4");
  svg.appendChild(arrow);
}

function drawVisual(type) {
  clearSVG();

  if (type === "moving_car") {
    drawCar(50, 130, "blue");
    drawArrow(140, 150, 220, 150);
  }

  if (type === "collision") {
    drawCar(200, 130, "blue");
    drawCar(280, 130, "red");
  }

  if (type === "stopping") {
    drawCar(200, 130, "blue");
  }

  if (type === "impulse") {
    drawCar(200, 130, "blue");
    drawArrow(200, 90, 200, 30); // force arrow
  }
}

