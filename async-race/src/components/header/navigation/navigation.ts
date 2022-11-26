import './navigation.scss';
import Control from "../../../utils/control";

export default class Navigation extends Control{
  readonly garageLink: Control;
  readonly winnersLink: Control;

  constructor() {
    super('nav', ['header__nav', 'nav']);

    const navList = new Control('ul', ['nav__list']);

    this.garageLink = new Control('a', ['nav__link'], 'Garage');
    this.garageLink.element.setAttribute('href', '/garage');

    this.winnersLink = new Control('a', ['nav__link'], 'Winners');
    this.winnersLink.element.setAttribute('href', '/winners');

    [this.garageLink, this.winnersLink].forEach(link => {
      const li = new Control('li', ['nav__list-item']);
      li.element.append(link.element);
      navList.element.append(li.element);
    });

    this.element.append(navList.element);
  }
}