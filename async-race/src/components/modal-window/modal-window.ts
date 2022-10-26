import Control from "../../utils/control";
import Button from "../button/button";
import './modal-window.scss';

export default class ModalWindow extends Control {
  readonly overlay: Control

  readonly modalWindowMain: Control

  readonly modalWindowBtn: Button

  constructor() {
    super('div', ['modal-window']);

    this.overlay = new Control('div', ['overlay', 'active']);
    this.modalWindowMain = new Control('div', ['modal-window__main']);
    this.modalWindowBtn = new Button('✖', ['modal-window__btn']);
  }

  render(textContent: string): void {
    this.overlay.element.addEventListener('click', () => this.remove());
    this.modalWindowBtn.element.addEventListener('click', () => this.remove());

    this.modalWindowMain.element.textContent = textContent;

    this.element.append(this.modalWindowBtn.element, this.modalWindowMain.element);
    document.body.prepend(this.overlay.element, this.element);
  }

  private remove(): void {
    this.element.remove();
    this.overlay.element.remove();
  }
}