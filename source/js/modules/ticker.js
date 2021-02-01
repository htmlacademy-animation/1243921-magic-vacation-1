export default class Ticker {
  constructor(minText, secText, dur) {
    this.minText = minText;
    this.secText = secText;
    this.timeStart = 0;
    this.duration = dur * 60 * 1000;
    this.tickerId = null;
  }

  start() {
    this.timeStart = (new Date()).getTime();
    this.init();
  }

  init() {
    this.tickerId = requestAnimationFrame(() => {
      this.init();
    });

    const timeNow = (new Date()).getTime();
    const time = this.duration - (timeNow - this.timeStart);
    const timeSec = Math.floor((time / 1000) % 60);
    const timeMin = Math.floor((time / 1000 / 60) % 60);

    this.printTime(timeSec, timeMin);

    if ((timeMin === 0 && timeSec === 0) || timeMin < 0 || timeSec < 0) {
      this.reset();
    }
  }

  printTime(timeSec, timeMin) {
    if (timeMin < 10) {
      this.minText.innerText = `0${timeMin}`;
    } else {
      this.minText.innerText = timeMin;
    }
    if (timeSec < 10) {
      this.secText.innerText = `0${timeSec}`;
    } else {
      this.secText.innerText = timeSec;
    }
  }

  reset() {
    cancelAnimationFrame(this.tickerId);
    this.minText.innerText = `00`;
    this.secText.innerText = `00`;
  }
}
