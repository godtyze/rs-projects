import Navigation from "./navigation/navigation";
import './header.scss';
import Control from "../../utils/control";

export default class Header extends Control{
  readonly navigation: Navigation;

  constructor() {
    super('header', ['header']);

    this.navigation = new Navigation();

    const title = new Control('h1', ['header__title'], 'Async Race').element;

    this.element.append(this.navigation.element, title);
  }
}