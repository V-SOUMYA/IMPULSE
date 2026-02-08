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
