import './TextInput.scss';
import { ITextInput } from "../../../types/types";
import Store from "../../store/Store";
import Control from "../../../utils/control";

export default class TextInput implements ITextInput{
  readonly element: HTMLElement;
  readonly onInputCallback: () => void;
  input: HTMLInputElement;
  cross: HTMLElement | null;

  constructor(onInputCallback: () => void) {
    this.input = document.createElement('input');

    this.cross = document.createElement('div');

    this.element = this.init();

    this.onInputCallback = onInputCallback;
  }

  private init() {
    const inputWrapper = new Control('div', ['input-wrapper']).element;

    this.input.setAttribute('type', 'text');
    this.input.setAttribute('autofocus', 'true');
    this.input.setAttribute('autocomplete', 'off');
    this.input.placeholder = 'Введите название игрушки';
    this.input.classList.add('aside__input');
    this.input.value = Store.query as string;

    const cross = this.cross as HTMLElement;
    cross.classList.add('cross');

    cross.addEventListener('click', () => {
      this.input.value = '';
      Store.query = this.input.value;
      cross.remove();
      this.input.classList.remove('filled');
      this.onInputCallback();
    });

    if (this.input.value) {
      inputWrapper.append(cross);
      this.input.classList.add('filled');
    }

    this.input.addEventListener('input', () => {
      Store.query = this.input.value.trim();

      if (this.input.value.trim()) {
        this.input.classList.add('filled');
        inputWrapper.append(cross);
      } else {
        cross.remove();
        this.input.classList.remove('filled');
        this.cross = null;
      }

      this.onInputCallback();
    });

    inputWrapper.append(this.input);
    return inputWrapper;
  }
}