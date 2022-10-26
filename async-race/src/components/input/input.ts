import Control from "../../utils/control";

export default class Input extends Control {
  constructor(
    type: 'text' | 'color',
    className: Array<string> = [],
    placeholder?: string
  ) {
    super('input', [...className]);
    this.element.setAttribute('type', type);
    if (placeholder) {
      this.element.setAttribute('placeholder', placeholder);
    }
  }
}