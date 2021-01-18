import throttle from 'lodash/throttle';

const ID_STORY = 1;
const ID_INTRO = 0;

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.screenBackground = document.querySelector(`.screen__background`);
    this.svgFirstAward = document.getElementById(`svgFirstAward`);
    this.svgSecondAward = document.getElementById(`svgSecondAward`);
    this.svgThirdAward = document.getElementById(`svgThirdAward`);
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {
      trailing: true
    }));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
    this.lastActiveScreen = this.activeScreen;
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const addActiveScreen = () => {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
    };

    if (this.screenElements[this.activeScreen].classList.contains(`screen--prizes`) &&
      (this.lastActiveScreen === ID_STORY || this.lastActiveScreen === ID_INTRO)
    ) {
      this.screenBackground.classList.add(`active`);
      setTimeout(() => {
        addActiveScreen();
      }, 200);
    } else {
      this.screenBackground.classList.remove(`active`);
      addActiveScreen();
    }

    if (this.screenElements[this.activeScreen].classList.contains(`screen--prizes`)) {
      this.svgFirstAward.src = `img/primary-award-from.svg`;
      this.svgSecondAward.src = `img/secondary-award-from.svg`;
      this.svgThirdAward.src = `img/additional-award-from.svg`;
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    this.lastActiveScreen = this.activeScreen;
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
