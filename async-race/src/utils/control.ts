export default class Control {
  readonly element: HTMLElement;

  constructor(
    tagName: keyof HTMLElementTagNameMap,
    className: Array<string> = [],
    textContent = ''
  ) {
    const el = document.createElement(tagName);
    el.classList.add(...className);
    el.textContent = textContent;
    this.element = el;
  }
}