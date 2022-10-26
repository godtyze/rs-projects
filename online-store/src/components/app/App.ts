import ProductCard from "../product-card/ProductCard";
import data from '../../data.json';
import {IAsideMenu, Toy} from "../../types/types";
import AsideMenu from "../aside-menu/AsideMenu";
import Store from "../store/Store";
import Control from "../../utils/control";

export default class App {
  readonly productCards: Array<ProductCard>;
  filteredProductCards: Array<ProductCard>;
  readonly asideMenu: IAsideMenu;

  constructor() {
    this.productCards = data.map(el => new ProductCard(el as Toy, (Store.pickedCards.indexOf(el.num) !== -1)));
    this.asideMenu = new AsideMenu(() => {
      this.filterProducts();
      this.sortProducts();
    });
    this.filteredProductCards = [...this.productCards];
  }

  start() {
    this.asideMenu.init();
    this.filterProducts();
    this.sortProducts();
    this.handleLocalStorage();
  }

  handleLocalStorage() {
    const cartCounter = document.querySelector('.header__cart span') as HTMLElement;
    cartCounter.textContent = localStorage.getItem('cartCounter') || '0';

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cartCounter', cartCounter.textContent as string);

      localStorage.setItem('pickedCards', JSON.stringify(Store.pickedCards));

      localStorage.setItem('yearFilters', JSON.stringify([this.asideMenu.yearRangeSlider.left,
        this.asideMenu.yearRangeSlider.right]));

      localStorage.setItem('countFilters', JSON.stringify([this.asideMenu.quantityRangeSlider.left,
        this.asideMenu.quantityRangeSlider.right]));

      localStorage.setItem('selectFiltersByValue', JSON.stringify(Store.selectFiltersByValue));

      localStorage.setItem('query', Store.query as string);

      localStorage.setItem('sort', Store.sort);
    });
  }

  filterProducts() {
    const rangeSlidersHandler = this.productCards.filter((el =>
      [this.asideMenu.quantityRangeSlider, this.asideMenu.yearRangeSlider]
        .every(slider => slider.validate(el.data[slider.type] as string))));

    const queryHandler = rangeSlidersHandler
      .filter((el => el.data.name.toLowerCase().includes((Store.query as string).toLowerCase()) || !Store.query));


    const selectFiltersHandler = queryHandler.filter(el => {
      const {shape, size, color} = el.data;

      return (Store.selectFiltersByValue.color.includes(color) || !Store.selectFiltersByValue.color.length) &&
        (Store.selectFiltersByValue.shape.includes(shape) || !Store.selectFiltersByValue.shape.length) &&
        (Store.selectFiltersByValue.size.includes(size) || !Store.selectFiltersByValue.size.length)
    });

    this.filteredProductCards = selectFiltersHandler;

    this.drawCards();
  }

  sortProducts() {
    this.filteredProductCards.sort((a, b) => {
      switch (Store.sort) {
        case 'По названию(А-Я)':
          if (a.data.name < b.data.name) {
            return -1;
          }

          if (a.data.name > b.data.name) {
            return 1;
          }

          return 0;

        case 'По названию(Я-А)':
          if (a.data.name < b.data.name) {
            return 1;
          }

          if (a.data.name > b.data.name) {
            return -1;
          }

          return 0;

        case 'По году изготовления(по убыванию)':
          if (+a.data.year > +b.data.year) {
            return -1;
          }

          if (+a.data.year < +b.data.year) {
            return 1;
          }

          return 0;

        case 'По году изготовления(по возрастанию)':
          if (+a.data.year > +b.data.year) {
            return 1;
          }
          if (+a.data.year < +b.data.year) {
            return -1;
          }

          return 0;
      }
      return 0;
    });

    this.drawCards();
  }

  drawCards() {
    const products = document.querySelector('.products') as HTMLElement;

    const productsWrapper = new Control('div', ['products-wrapper']).element;

    if (this.filteredProductCards.length) {
      this.filteredProductCards.forEach(el => productsWrapper.append(el.element));
    } else {
      const msg = new Control('p', [], 'Извините, совпадений не обнаружено').element;
      msg.style.fontSize = '40px';
      msg.style.textAlign = 'center';
      productsWrapper.append(msg)
    }

    products.innerHTML = '';
    products.append(productsWrapper);
  }
}