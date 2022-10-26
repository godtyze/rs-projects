import {IAsideMenu, IRangeSlider, ISelectFilter, ISort, ITextInput} from "../../types/types";
import RangeSlider from "./range-slider/RangeSlider";
import './AsideMenu.scss';
import TextInput from "./text-input/TextInput";
import SelectFilter from "./select-filter/SelectFilter";
import Store from "../store/Store";
import Sort from "./sort/Sort";
import * as noUiSlider from "nouislider";
import consts from "../../consts/consts";
import Control from "../../utils/control";

export default class AsideMenu implements IAsideMenu{
  readonly yearRangeSlider: IRangeSlider;
  readonly quantityRangeSlider: IRangeSlider;
  readonly textInput: ITextInput;
  readonly selectFilterColor: ISelectFilter;
  readonly selectFilterShape: ISelectFilter;
  readonly selectFilterSize: ISelectFilter;
  readonly clearFilters: HTMLButtonElement;
  readonly sort: ISort;
  readonly clearFiltersCallback: () => void;

  constructor(onChangeCallback: () => void) {
    this.yearRangeSlider = new RangeSlider('year'
      , localStorage.getItem('yearFilters') ? +JSON.parse(localStorage.getItem('yearFilters') as string)[0] : consts.yearSliderStartMin
      , localStorage.getItem('yearFilters') ? +JSON.parse(localStorage.getItem('yearFilters') as string)[1] : consts.yearSliderStartMax
      , consts.yearSliderRangeMin
      , consts.yearSliderRangeMax
      , onChangeCallback);

    this.quantityRangeSlider = new RangeSlider('count'
      ,localStorage.getItem('countFilters') ? +JSON.parse(localStorage.getItem('countFilters') as string)[0] : consts.quantitySliderStartMin
      , localStorage.getItem('countFilters') ? +JSON.parse(localStorage.getItem('countFilters') as string)[1] : consts.quantitySliderStartMax
      , consts.quantitySliderRangeMin
      , consts.quantitySliderRangeMax
      , onChangeCallback);

    this.textInput = new TextInput(onChangeCallback);

    this.selectFilterColor = new SelectFilter(['зелёный', 'красный', 'желтый', 'белый', 'синий'], 'color',
      Store.selectFiltersByValue,
      onChangeCallback);

    this.selectFilterShape = new SelectFilter(['фигурка', 'шар', 'шишка', 'снежинка', 'колокольчик'], 'shape',
      Store.selectFiltersByValue,
      onChangeCallback);

    this.selectFilterSize = new SelectFilter(['малый', 'средний', 'большой'], 'size',
      Store.selectFiltersByValue,
      onChangeCallback);

    this.clearFilters = this.initClearFilters();

    this.sort = new Sort(Store.sort, onChangeCallback);

    this.clearFiltersCallback = onChangeCallback;
  }

  private initClearFilters() {
    const btn = new Control('button',
      ['card__btn', 'aside__clear-filters'], 'Сброс фильтров').element as HTMLButtonElement;

    btn.addEventListener('click', () => {
      (this.yearRangeSlider.sliderNoUi as noUiSlider.API).set([consts.yearSliderRangeMin, consts.yearSliderRangeMax]);
      (this.quantityRangeSlider.sliderNoUi as noUiSlider.API).set([consts.quantitySliderRangeMin, consts.yearSliderRangeMax]);

      for (const key in Store.selectFiltersByValue) {
        Store.selectFiltersByValue[key as 'color' | 'shape' | 'size'] = [];
      }

      Store.query = '';

      this.textInput.input.value = '';

      if (this.textInput.cross) {
        this.textInput.cross.remove();
        this.textInput.input.classList.remove('filled');
      }

      document.querySelectorAll('.select-filter__btn').forEach(el => el.classList.remove('active'));

      this.yearRangeSlider.left = consts.yearSliderRangeMin;
      this.yearRangeSlider.right = consts.yearSliderRangeMax;
      this.quantityRangeSlider.left = consts.quantitySliderRangeMin;
      this.quantityRangeSlider.right = consts.yearSliderRangeMax;

      this.clearFiltersCallback();
    });

    return btn;
  }

  init() {
    const aside = document.querySelector('aside') as HTMLElement;

    aside.append(this.textInput.element,
      this.sort.element,
      this.yearRangeSlider.element,
      this.quantityRangeSlider.element,
      this.selectFilterColor.element,
      this.selectFilterShape.element,
      this.selectFilterSize.element,
      this.clearFilters);
  }
}