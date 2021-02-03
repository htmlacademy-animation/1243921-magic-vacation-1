import NumberFrameTicker from "./numberFrameTicker.js";

let containers = document.querySelectorAll(`.prizes__desc b`);
let timings = [0, 3500, 6000];
let startNubers = [3, 1, 11];
let endNumbers = [3, 7, 900];
let steps = [1, 1, 81];


let startNumbersTicker = () => {
  for (let index = 1; index < containers.length; index++) {
    setTimeout(() => {
      new NumberFrameTicker(containers[index], startNubers[index], endNumbers[index], steps[index]).start();
    }, timings[index]);
  }
};

let resetNumbersTicker = () => {
  for (let index = 1; index < containers.length; index++) {
    containers[index].innerText = `${endNumbers[index]}`;
  }
};


export {
  startNumbersTicker,
  resetNumbersTicker
};
