"use strict";

window.addEventListener("load", start);

function start() {
  document.querySelector("input").addEventListener("input", getInputColor);
}

function getInputColor() {
  const colorValue = document.querySelector("input").value;
  showColorBox(colorValue);
  showSelectedColor(colorValue);
}

//Shows color in box
function showColorBox(color) {
  const colorBox = document.querySelector(".color");
  colorBox.style.backgroundColor = color;
}

// Delegates functions and displays values
function showSelectedColor(hex) {
  const rgbOuput = getRgb(hex);
  document.querySelector(".rgb").textContent = rgbOuput;

  const hslOutput = getHsl(hex);
  document.querySelector(".hsl").textContent = hslOutput;

  document.querySelector(".hex").textContent = "HEX: " + hex;

  const cssOutput = getCss(hex);
  console.log(cssOutput);
}

// functions to get each value and get output

function getRgb(hex) {
  const rgb = hexToRgb(hex);
  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;
  const displayRgb = "RGB: " + r + ", " + g + ", " + b;
  return displayRgb;
}

function getCss(hex) {
  const css = rgbToCss(hex);
  console.log(css);
  return css;
}

function getHsl(hex) {
  const hsl = rgbToHsl(hex);
  const h = hsl.h.toString().substring(0, 3);
  const s = hsl.s.toString().substring(0, 2);
  const l = hsl.l.toString().substring(0, 2);
  const displayHsl = "HSL: " + h + ", " + s + "% " + l + "%";
  return displayHsl;
}

// functions that calculate each value
function hexToRgb(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);

  const r = parseInt(red, 16);
  const g = parseInt(green, 16);
  const b = parseInt(blue, 16);

  return { r, g, b };
}

function rgbToHsl(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);

  let r = parseInt(red, 16);
  let g = parseInt(green, 16);
  let b = parseInt(blue, 16);

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return { h, s, l };
}

function rgbToCss(hex) {
  const red = hex.substring(1, 3);
  const green = hex.substring(3, 5);
  const blue = hex.substring(5, 7);

  let r = parseInt(red, 16);
  let g = parseInt(green, 16);
  let b = parseInt(blue, 16);

  const rgbAsCss = `rgb(${r}, ${g}, ${b})`;
  return rgbAsCss;
}
