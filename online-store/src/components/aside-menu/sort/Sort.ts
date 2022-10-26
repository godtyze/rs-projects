import './Sort.scss';
import Store from "../../store/Store";
import { ISort } from "../../../types/types";
import Control from "../../../utils/control";

export default class Sort implements ISort{
  element: HTMLElement;
  onClickCallback: () => void;

  constructor(setting: string, onClickCallback: () => void) {
    this.element = this.init(setting);
    this.onClickCallback = onClickCallback;
  }

  private init(setting: string) {
    const dropDown = new Control('div',['aside-dropdown', 'dropdown']).element;

    const dropDownHeader = new Control('h3', ['dropdown__header'], 'Сортировка').element;

    const dropDownSelected = new Control('span', ['dropdown__selected'], setting).element;

    const settingsArr = ['По названию(А-Я)', 'По названию(Я-А)',
      'По году изготовления(по убыванию)', 'По году изготовления(по возрастанию)'];

    const dropDownSettings = new Control('div', ['dropdown__settings']).element;

    settingsArr.forEach(el => {
      const setting = new Control('span', [], el).element;

      setting.addEventListener('click', () => {
        dropDownSelected.textContent = el;
        Store.sort = el;

        this.onClickCallback();
      });
      dropDownSettings.append(setting);
    });

    dropDown.append(dropDownHeader, dropDownSelected, dropDownSettings);
    return dropDown;
  }
}