import Control from "../../utils/control";

export default class ErrorPage extends Control {
  constructor() {
    super('div', ['error-page']);
    const errorText = new Control('p', ['error'], 'No connection to the server!');
    this.element.append(errorText.element);
  }
}