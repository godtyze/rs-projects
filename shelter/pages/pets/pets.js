import pets from '../pets.js';
import createCard from "../index.js";

const cardsWrapper = document.querySelector('.cards');
const firstBtn = document.querySelector('.first');
const prevBtn = document.querySelector('.prev');
const pageBtn = document.querySelector('.page');
const nextBtn = document.querySelector('.next');
const lastBtn = document.querySelector('.last');

let visibleCards = 8;
let page = 1;

if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  visibleCards = 6;
}

if (window.innerWidth < 768) {
  visibleCards = 3;
}

const shuffle = (array) => {
  let shuffleArray = [...array];
  for (let i = shuffleArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }
  return shuffleArray;
}

const create48ItemsPets = () => {
  let pets48 = [];
  for (let i = 0; i < 16; i++) {
    pets48.push(...shuffle(pets));
  }
  return pets48;
}

const rnd48Pets = create48ItemsPets();

const renderCards = () => {
  for (let i = 8 * page - 8; i < 8 * page; i++) {
    createCard(rnd48Pets[i]);
  }
}
renderCards();

const resizeMedia = [
  window.matchMedia('(max-width: 767px)'),
  window.matchMedia('(max-width: 1279px)'),
  window.matchMedia('(min-width: 768px)'),
  window.matchMedia('(min-width: 1280px)')]

resizeMedia.forEach(el => {
  el.addEventListener('change', () => {
    if (el.matches) {
      if (el.media === '(max-width: 767px)') {
        visibleCards = 3;
      }
      if (el.media === '(min-width: 768px)') {
        visibleCards = 6;
      }
      if (el.media === '(max-width: 1279px)') {
        visibleCards = 6;
      }
      if (el.media === '(min-width: 1280px)') {
        visibleCards = 8;
      }
    }
    page = 1;
    firstBtn.classList.add('disabled-btn');
    prevBtn.classList.add('disabled-btn');
    nextBtn.classList.remove('disabled-btn');
    lastBtn.classList.remove('disabled-btn');
    cardsWrapper.innerHTML = '';
    renderCards();
    pageBtn.textContent = `${page}`;
  })
})

const clickHandler = (event) => {
  if (event.target.classList.contains('next')) {
    page++;
    cardsWrapper.innerHTML = '';
    renderCards();
  }

  if (event.target.classList.contains('prev')) {
    page--;
    cardsWrapper.innerHTML = '';
    renderCards();
  }

  if (event.target.classList.contains('first')) {
    page = 1;
    cardsWrapper.innerHTML = '';
    renderCards();
  }

  if (event.target.classList.contains('last')) {
    if (visibleCards === 8) page = 6;
    if (visibleCards === 6) page = 8;
    if (visibleCards === 3) page = 16;
    cardsWrapper.innerHTML = '';
    renderCards();
  }

    if ((visibleCards === 8 && page === 6) || (visibleCards === 6 && page === 8) || (visibleCards === 3 && page === 16)) {
      nextBtn.classList.add('disabled-btn');
      lastBtn.classList.add('disabled-btn');
      firstBtn.classList.remove('disabled-btn');
      prevBtn.classList.remove('disabled-btn');
    } else if ((page > 1 && page < 6) || (page > 1 && page < 8) || (page > 1 && page < 16)) {
      firstBtn.classList.remove('disabled-btn');
      prevBtn.classList.remove('disabled-btn');
      nextBtn.classList.remove('disabled-btn');
      lastBtn.classList.remove('disabled-btn');
    } else {
      firstBtn.classList.add('disabled-btn');
      prevBtn.classList.add('disabled-btn');
      nextBtn.classList.remove('disabled-btn');
      lastBtn.classList.remove('disabled-btn');
    }

  pageBtn.textContent = `${page}`;
}


firstBtn.addEventListener('click', clickHandler);
nextBtn.addEventListener('click', clickHandler);
prevBtn.addEventListener('click', clickHandler);
lastBtn.addEventListener('click', clickHandler);
