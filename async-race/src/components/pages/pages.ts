import Control from "../../utils/control";
import Button from "../button/button";
import './pages.scss';
import Store from "../../store/store";

export default class Pages extends Control {
  pageCounter: Control;

  nextPageBtn: Button;

  prevPageBtn: Button;

  constructor(className: Array<string>) {
    super('div', [...className, 'pages']);

    this.nextPageBtn = new Button('>', ['btn', 'pages__btn-next']);
    this.prevPageBtn = new Button('<', ['btn', 'pages__btn-prev']);
    this.pageCounter = new Control('p',
      ['pages__counter'], `Page #${className.join('') === 'garage__pages' ? Store.garagePage : Store.winnersPage}`);

    this.render();
  }

  render(): void {
    const pagesContainer = new Control('div', ['pages__buttons']).element;
    pagesContainer.append(this.prevPageBtn.element, this.nextPageBtn.element);

    this.element.append(
      this.pageCounter.element,
      pagesContainer
    );
  }
}