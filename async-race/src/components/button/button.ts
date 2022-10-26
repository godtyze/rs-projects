import './button.scss';
import Control from "../../utils/control";

export default class Button extends Control {
  constructor(textContent: string, className: Array<string>, disabled = false) {
    super('button', ['btn', ...className], textContent);
    if (disabled) this.element.setAttribute('disabled', '');
  }
}