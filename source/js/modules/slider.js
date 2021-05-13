import Swiper from "swiper";
import Story from './helpers/3d/story.js';

export default () => {
  const story = new Story();

  let storySlider;

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {

            switch (storySlider.activeIndex) {
              case 0:
              case 1:
                story.setScene(0);
                break;
              case 2:
              case 3:
                story.setScene(1);
                break;
              case 4:
              case 5:
                story.setScene(2);
                break;
              case 6:
              case 7:
                story.setScene(3);
                break;
              default:
                story.setScene(0);
                break;
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            switch (storySlider.activeIndex) {
              case 0:
                story.setScene(0);
                break;
              case 2:
                story.setScene(1);
                break;
              case 4:
                story.setScene(2);
                break;
              case 6:
                story.setScene(3);
                break;
              default:
                story.setScene(0);
                break;
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      story.init();

      switch (storySlider.activeIndex) {
        case 0:
        case 1:
          story.setScene(0);
          break;
        case 2:
        case 3:
          story.setScene(1);
          break;
        case 4:
        case 5:
          story.setScene(2);
          break;
        case 6:
        case 7:
          story.setScene(3);
          break;
        default:
          story.setScene(0);
          break;
      }
    }
  });


  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    story.setScene(0);

    setSlider();
  });

  setSlider();
};
