import * as noUiSlider from "nouislider";

export interface IProductCard {
  modalWindow: IModalWindow;
  element: HTMLElement;
  picked: boolean
  togglePicked: () => void
}

export interface IModalWindow {
  create: () => void,
  remove: () => void
}

export interface IRangeSlider {
  element: HTMLElement,
  left: number,
  right: number,
  onChangeCallBack: () => void,
  type: keyof Toy,
  sliderNoUi: noUiSlider.API | null,
  validate: (arg: number | string) => boolean
}

export interface ISelectFilter {
  element: HTMLElement,
  pickedFilters: selectFiltersByValue,
  onClickCallback: () => void
}

export interface ITextInput {
  element: HTMLElement,
  input: HTMLInputElement,
  cross: HTMLElement | null,
  onInputCallback: (arg: string) => void
}

export interface IAsideMenu {
  yearRangeSlider: IRangeSlider,
  quantityRangeSlider: IRangeSlider,
  textInput: ITextInput,
  selectFilterColor: ISelectFilter,
  selectFilterShape: ISelectFilter,
  selectFilterSize: ISelectFilter,
  sort: ISort,
  clearFilters: HTMLButtonElement;
  clearFiltersCallback: () => void;
  init: () => void
}

export interface ISort {
  element: HTMLElement;
}

export type selectFiltersByValue = {
  shape: Array<Shape>,
  color: Array<Color>,
  size: Array<Size>
}

export type Shape = 'фигурка' | 'шар' | 'шишка' | 'снежинка' | 'колокольчик';
export type Color = 'зелёный' | 'красный' | 'желтый' | 'белый' | 'синий';
export type Size = 'малый' | 'средний' | 'большой';

export type Toy = {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: Shape,
  color: Color,
  size: Size,
  favorite: boolean
}

