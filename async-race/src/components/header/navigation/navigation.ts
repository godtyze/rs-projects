import './navigation.scss';
import Button from "../../button/button";
import Control from "../../../utils/control";

export default class Navigation extends Control{
  readonly garageBtn: Button;
  readonly winnersBtn: Button;

  constructor() {
    super('nav', ['header__nav', 'nav']);

    this.garageBtn = new Button('Garage', ['nav__btn', 'active']);
    this.winnersBtn = new Button('Winners', ['nav__btn']);

    this.element.append(this.garageBtn.element, this.winnersBtn.element);
  }
}