const firePixelArray = [];
const fireWidth = 48;
const fireHeight = 48;
const maxFireSize = 36;
let fireSize = maxFireSize;
let onOff = true;
let direction = -1;
const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];
let debug = false;

let fireIntensitySlider = $("#fireSlider");
let aumentarBtn = $("#aumentar");
let diminuirBtn = $("#diminuir");
let onOffBtn = $("#onOff");
let debugBtn = $("#debug");

function start() {
  createFireDataStructure();
  createFireSource();
  renderFire();
  setInterval(calculateFirePropagation, 41.6);
}

function createFireDataStructure() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i += 1) {
    firePixelArray[i] = 0;
  }
}

function calculateFirePropagation() {
  let matrixSize = fireHeight * fireWidth;

  for(let i = 0; i < matrixSize - fireWidth; i += 1){
    updateFireIntensityPerPixel(i);
  }
  renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  if (belowPixelIndex >= fireHeight * fireWidth) {
    return;
  }

  const decay = Math.floor(Math.random() * 3);
  const wind = Math.floor(Math.random() * 2);
  const belowFireIntensity = firePixelArray[belowPixelIndex];
  const newFireIntensity =
    belowFireIntensity - decay >= 0 ? belowFireIntensity - decay : 0;

  firePixelArray[currentPixelIndex + (wind*direction)] = newFireIntensity;
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column += 1) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + column;

    firePixelArray[pixelIndex] = fireSize;
  }
}

function renderFire() {
  let html = "<table cellpadding=0 cellspacing=0>";

  for (let row = 0; row < fireHeight; row += 1) {
    html += "<tr>";

    for (let column = 0; column < fireWidth; column += 1) {
      const pixelIndex = column + fireWidth * row;
      const fireIntensity = firePixelArray[pixelIndex];

      if (debug) {
        html += "<td>";
        html += `<div class="pixel-index">${pixelIndex}</div>`;
        html += fireIntensity;
        html += "</td>";
      } else {
        const color = fireColorsPalette[fireIntensity];
        const colorString = `${color.r},${color.g},${color.b}`;
        html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
        html += "</td>";
      }
    }

    html += "</tr>";
  }

  html += "</table>";

  document.querySelector("#fireCanvas").innerHTML = html;
}

function fireControl(){
  fireSize = parseInt(fireIntensitySlider.val());
  createFireSource();
}

function aumentarFogo() {
  if (fireSize < maxFireSize) {
    fireSize += 1;
    createFireSource();
    fireIntensitySlider.val(fireSize);
  }
}

function diminuirFogo() {
  if (fireSize > 0) {
    fireSize -= 1;
    createFireSource();
    fireIntensitySlider.val(fireSize);
  }
}

function onOffSwitch() {
  if (onOff) {
    fireSize = 0;
    onOff = false;
    createFireSource();
  } else {
    fireSize = maxFireSize;
    onOff = true;
    createFireSource();
  }
  fireIntensitySlider.val(fireSize);
}

function debugSwitch() {
  if (debug) {
    debug = false;
  } else {
    debug = true;
  }
}

fireIntensitySlider.on('input change', fireControl);
aumentarBtn.on('click', aumentarFogo);
diminuirBtn.on('click', diminuirFogo);
onOffBtn.on('click', onOffSwitch);
debugBtn.on('click', debugSwitch);

start();
