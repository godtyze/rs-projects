import './ProductCard.scss';
import {Toy, IProductCard, IModalWindow} from "../../types/types";
import ModalWindow from "../modal-window/ModalWindow";
import Store from "../store/Store";
import consts from "../../consts/consts";

export default class ProductCard implements IProductCard {
  readonly modalWindow: IModalWindow;
  element: HTMLElement;
  picked = false;
  readonly data: Toy;
  private readonly btn: HTMLButtonElement;

  constructor(data: Toy, picked: boolean) {
    this.modalWindow = new ModalWindow();

    this.data = data;

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    this.element = cardContainer;

    const btn = document.createElement('button');
    btn.textContent = 'Добавить в корзину';
    btn.classList.add('card__btn');

    this.btn = btn;

    this.init(this.data);

    if (picked) this.togglePicked();
  }

  private init(data: Toy) {
    const img = document.createElement('img');
    img.src = `./assets/toys/${data.num}.png`;
    img.alt = 'Toy image';
    img.classList.add('card__img');

    const title = document.createElement('h4');
    title.textContent = data.name;
    title.classList.add('card__title');

    const cardList = document.createElement('ul');
    cardList.classList.add('card__list');

    const count = document.createElement('li');
    count.textContent = 'Количество товара: ' + data.count;

    const year = document.createElement('li');
    year.textContent = 'Год изготовления: ' + data.year;

    const shape = document.createElement('li');
    shape.textContent = 'Форма: ' + data.shape;

    const color = document.createElement('li');
    color.textContent = 'Цвет: ' + data.color;

    const size = document.createElement('li');
    size.textContent = 'Размер: ' + data.size;
    cardList.append(count, year, shape, color, size);

    this.element.append(img, title, cardList, this.btn);
    this.element.addEventListener('click', () => this.clickHandler());
  }

  private clickHandler() {
    const cartCounter = document.querySelector('.header__cart span') as HTMLElement;

    if (Store.counter === consts.maxCartSize && !this.element.classList.contains('picked-card')) {
      this.modalWindow.create();
    } else if (!this.picked && Store.counter < consts.maxCartSize) {
      Store.addPickedCards(this.data.num);
      Store.counter++;
      this.togglePicked();
    } else {
      Store.removePickedCards(this.data.num);
      Store.counter--;
      this.togglePicked();
    }

    cartCounter.textContent = `${Store.counter}`;
  }

  togglePicked() {
    this.picked = !this.picked;

    if (this.picked) {
      this.element.classList.add('picked-card');
      this.btn.textContent = 'Выбрано!';
      this.btn.classList.add('picked-btn');
    } else {
      this.element.classList.remove('picked-card');
      this.btn.classList.remove('picked-btn');
      this.btn.textContent = 'Добавить в корзину';
    }
  }
}
