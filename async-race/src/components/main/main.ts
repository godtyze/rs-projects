import './main.scss';
import Control from "../../utils/control";

export default class Main extends Control {

  constructor() {
    super('main', ['main']);
    const text = new Control('h1', ['text'], 'This is main page!').element;
    this.element.append(text);
  }
}