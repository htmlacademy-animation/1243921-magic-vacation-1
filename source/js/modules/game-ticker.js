import Ticker from "./ticker";

const mins = document.querySelector(`.game__counter span:first-child`);
const secs = document.querySelector(`.game__counter span:last-child`);
const ticker = new Ticker(mins, secs, 5);

const startTicker = () => {
  ticker.start();
};

const resetTicker = () => {
  ticker.reset();
};

export {
  startTicker,
  resetTicker
};
