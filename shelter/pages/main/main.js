import pets from '../pets.js';
import createCard from "../index.js";

const cardsWrapper = document.querySelector('.cards');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const visibleCards = 3;
let currentCards = [];
let restCards = pets;

const shuffle = () => {
  let idx = Math.floor(Math.random() * restCards.length);
  currentCards.push(restCards[idx]);
  restCards = restCards.slice(0, idx).concat(restCards.slice(idx + 1));
}

const addCurrentCards = () => {
  while (currentCards.length !== visibleCards) {
    shuffle(restCards);
  }
}

const renderCards = (isLeft) => currentCards.forEach(pet => isLeft ? createCard(pet, true) : createCard(pet));

addCurrentCards();
renderCards();

const removeCards = (isLeft) => {
  if (isLeft) {
    for (let i = 0; i < visibleCards; i++) {
      cardsWrapper.lastChild.remove();
    }
    cardsWrapper.classList.remove('move-left');
  } else {
    for (let i = 0; i < visibleCards; i++) {
        cardsWrapper.firstChild.remove();
    }
    cardsWrapper.classList.remove('move-right');
  }
}

const clickHandler = (event) => {
  for (let i = 0; i < visibleCards; i++) {
    shuffle(pets);
  }
  restCards = restCards.concat(currentCards.slice(0, visibleCards))
  currentCards = currentCards.slice(visibleCards);

  if (event.currentTarget.classList.contains('prev')) {
    prevBtn.removeEventListener('click', clickHandler);
    nextBtn.removeEventListener('click', clickHandler);
    cardsWrapper.classList.add('move-center');
    setTimeout(() => cardsWrapper.classList.replace('move-center', 'move-left'), 0);
    setTimeout(() => {
      removeCards(true);
      prevBtn.addEventListener('click', clickHandler);
      nextBtn.addEventListener('click', clickHandler);
    }, 500);
    renderCards(true);
  } else {
    prevBtn.removeEventListener('click', clickHandler);
    nextBtn.removeEventListener('click', clickHandler);
    cardsWrapper.classList.add('move-right');
    setTimeout(() => {
      removeCards();
      prevBtn.addEventListener('click', clickHandler);
      nextBtn.addEventListener('click', clickHandler);
    }, 500);
    renderCards();
  }
}

prevBtn.addEventListener('click', clickHandler);
nextBtn.addEventListener('click', clickHandler);

