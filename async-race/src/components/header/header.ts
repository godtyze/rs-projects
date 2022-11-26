import Navigation from "./navigation/navigation";
import './header.scss';
import Control from "../../utils/control";

export default class Header extends Control{
  readonly navigation: Navigation;

  constructor() {
    super('header', ['header']);

    this.navigation = new Navigation();

    const title = new Control('h1', ['header__title']).element;
    const titleLink = new Control('a', ['header__title-link'], 'Async Race').element;
    titleLink.setAttribute('href', '/');
    title.append(titleLink);

    this.element.append(title, this.navigation.element);
  }
}