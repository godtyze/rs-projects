const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-wrapper');
const navLogo = document.querySelector('.nav-logo');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const cardsWrapper = document.querySelector('.cards');


const toggleHamburgerMenu = () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  navLogo.classList.toggle('active');
  overlay.classList.toggle('active');
  header.classList.toggle('active');
  main.classList.toggle('active');
  document.body.classList.toggle('active');
}

const closeMenu = (event) => {
  if (event.target.classList.contains('list__item-link')
    || event.target.classList.contains('overlay')
    || event.currentTarget.classList.contains('nav-logo')) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    navLogo.classList.remove('active');
    overlay.classList.remove('active');
    header.classList.remove('active');
    main.classList.remove('active');
    document.body.classList.remove('active');
  }
}

const createCard = (pet, isLeft) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = pet.img;
  img.classList.add('card__image');

  const title = document.createElement('h4');
  title.textContent = `${pet.name}`;
  title.classList.add('card__title');

  const btn = document.createElement('button');
  btn.textContent = 'Learn more';
  btn.classList.add('card-btn', 'btn');

  card.append(img, title, btn);
  card.addEventListener('click', () => createPopup(pet))
  isLeft ? cardsWrapper.prepend(card) : cardsWrapper.append(card);
}

const createPopup = (pet) => {
  const popupWrapper = document.createElement('div');
  popupWrapper.classList.add('popup');

  const popupBtn = document.createElement('div');
  popupBtn.textContent = '✖';
  popupBtn.classList.add('popup-btn', 'arr-wrapper');

  const popupWindow = document.createElement('div');
  popupWindow.classList.add('popup-main');

  const img = document.createElement('img');
  img.src = pet.img;
  img.classList.add('popup__img');

  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('popup__info');

  const title = document.createElement('div');
  title.classList.add('popup__title');

  const name = document.createElement('h3');
  name.textContent = `${pet.name}`;
  name.classList.add('popup__name');

  const type = document.createElement('h4');
  type.textContent = `${pet.type} - ${pet.breed}`;
  type.classList.add('popup__type')

  const description = document.createElement('p');
  description.textContent = `${pet.description}`;
  description.classList.add('popup__description');

  const list = document.createElement('ul');
  list.classList.add('popup__list');

  const titles = ['Age', 'Inoculations', 'Diseases', 'Parasites'];

  titles.forEach(title => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    const span = document.createElement('span');
    span.classList.add('list-item__text');
    const spanTitle = document.createElement('span');
    spanTitle.textContent = `${title}: `;
    spanTitle.classList.add('bold');
    const spanText = document.createElement('span');
    spanText.textContent = pet[title.toLowerCase()];
    span.append(spanTitle, spanText);
    listItem.append(span);
    list.append(listItem);
  });
  popupBtn.addEventListener('click', closePopup);
  title.append(name, type);
  infoWrapper.append(title, description, list);
  popupWindow.append(img, infoWrapper);
  popupWrapper.append(popupBtn, popupWindow);
  document.body.append(popupWrapper);
  document.body.classList.add('active');
  overlay.classList.add('active');
}

const closePopup = (event) => {
  if (event.target.classList.contains('overlay') || event.target.classList.contains('popup-btn')) {
    const popup = document.querySelector('.popup');
    popup && popup.remove();
    overlay.classList.remove('active');
    document.body.classList.remove('active');
  }
}

hamburger.addEventListener('click', toggleHamburgerMenu);
nav.addEventListener('click', closeMenu);
navLogo.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
overlay.addEventListener('click', closePopup);
overlay.addEventListener('mouseover', () => {
  const popupBtn = document.querySelector('.popup-btn');
  popupBtn && popupBtn.classList.add('active');
})
overlay.addEventListener('mouseout', () => {
  const popupBtn = document.querySelector('.popup-btn');
  popupBtn && popupBtn.classList.remove('active');
})

export default createCard;