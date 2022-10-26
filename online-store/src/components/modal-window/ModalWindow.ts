import './ModalWindow.scss';
import { IModalWindow } from "../../types/types";

export default class ModalWindow implements IModalWindow{
  create() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'active');
    overlay.addEventListener('click', this.remove);

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');

    const btn = document.createElement('div');
    btn.textContent = '✖';
    btn.classList.add('modal-window__btn');
    btn.addEventListener('click', this.remove);

    const modalWindowMain = document.createElement('div');
    modalWindowMain.classList.add('modal-window__main');

    const alert = document.createElement('span');
    alert.textContent = 'Извините, в корзину можно добавить не более 20 товаров!';


    modalWindowMain.append(alert);
    modalWindow.append(btn, modalWindowMain);
    document.body.prepend(overlay, modalWindow);
  }

  remove() {
    (document.querySelector('.modal-window') as HTMLElement).remove();
    (document.querySelector('.overlay') as HTMLElement).remove();
  }
}