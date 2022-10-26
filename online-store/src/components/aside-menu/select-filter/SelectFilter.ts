import './SelectFilter.scss';
import { Color, ISelectFilter, selectFiltersByValue, Shape, Size } from "../../../types/types";
import Store from "../../store/Store";
import Control from "../../../utils/control";

export default class SelectFilter implements ISelectFilter{
  element: HTMLElement;
  onClickCallback: () => void;
  pickedFilters: selectFiltersByValue;

  constructor(types: Array<Shape | Size | Color>, type: 'color' | 'shape' | 'size',
              pickedFilters: selectFiltersByValue, onClickCallback: () => void) {
    this.pickedFilters = pickedFilters;

    this.element = this.init(types, type);

    this.onClickCallback = onClickCallback;
  }

  private init(types: Array<Shape | Size | Color>, type: 'color' | 'shape' | 'size') {
    const selectFilterWrapper = new Control('div', ['select-filter-wrapper']).element;

    const selectFilterHeader = new Control('h3', ['select-filter__header']).element;

    switch (type) {
      case 'color':
        selectFilterHeader.textContent = 'Фильтр по цвету';
        break;

      case 'shape':
        selectFilterHeader.textContent = 'Фильтр по форме';
        break;

      case 'size':
        selectFilterHeader.textContent = 'Фильтр по размеру';
        break;
    }

    const btnsWrapper = new Control('div', ['btns-wrapper']).element;

    types.forEach(el => {
      const btn = new Control('button', ['btns-wrapper'], el).element;

      const selectFiltersByValue = (Store.selectFiltersByValue[type] as Array<Shape | Size | Color>);

      if (selectFiltersByValue.includes(el)) {
        btn.classList.add('card__btn', 'select-filter__btn', 'active')
      } else {
        btn.classList.add('card__btn', 'select-filter__btn');
      }

      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
          Store.removeSelectFilter(el, type)
        } else {
          Store.addSelectFilter(el, type);
        }

        btn.classList.toggle('active');

        this.onClickCallback();
      });

      btnsWrapper.append(btn);
    });

    selectFilterWrapper.append(selectFilterHeader, btnsWrapper);
    return selectFilterWrapper;
  }
}