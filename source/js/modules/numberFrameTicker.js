export default class NumberFrameTicker {
  constructor(container, start, end, step) {
    this.container = container;
    this.startNumber = start
    this.currentNumber = this.startNumber
    this.endNumber = end
    this.tickerId = null;
    this.fps = 1000 / 12;
    this.step = step;
    this.then = Date.now();
    this.elapsed = 0;
  }

  start() {

    this.init();
  }

  init() {
    this.tickerId = requestAnimationFrame(() => {
      this.init();
    });

    const now = Date.now();
    this.elapsed = now - this.then;
    if (this.elapsed > this.fps) {
      this.then = now - (this.elapsed % this.fps);
      if (this.endNumber - this.currentNumber < this.step) {
        this.currentNumber = this.endNumber
      } else {
        this.currentNumber += this.step
      }
      this.printNumber(this.currentNumber);
    }

    if (this.currentNumber === this.endNumber) {
      this.stop();
    }
  }

  printNumber(number) {
    this.container.innerText = `${number}`;
  }

  stop() {
    cancelAnimationFrame(this.tickerId);
  }
}
