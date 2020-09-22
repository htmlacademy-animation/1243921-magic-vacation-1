export default () => {

  const goNextBtn = document.querySelector('.rules__link');
  const items = document.querySelectorAll('.rules__item p');
  const itemsAmount = items.length;

  items[itemsAmount - 1].addEventListener('animationend', () => {
    goNextBtn.classList.add('rules__link-active');
  });
}
