import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './RangeSlider.scss';
import { IRangeSlider, Toy } from "../../../types/types";
import Control from "../../../utils/control";

export default class RangeSlider implements IRangeSlider{
  readonly element: HTMLElement;
  left: number;
  right: number;
  onChangeCallBack: () => void;
  type: keyof Toy;
  sliderNoUi: noUiSlider.API | null

  constructor(type: keyof Toy, startMin: number, startMax: number, rangeMin: number, rangeMax: number, onChangeCallBack: () => void) {
    this.type = type;

    this.onChangeCallBack = onChangeCallBack;

    this.sliderNoUi = null;

    this.element = this.create(type, startMin, startMax, rangeMin, rangeMax);

    this.left = startMin;

    this.right = startMax;
  }

  validate(arg: string | number): boolean {
    return arg >= this.left && arg <= this.right
  }

  private create(type: keyof Toy, startMin: number, startMax: number, rangeMin: number, rangeMax: number): HTMLElement {
    const sliderWrapper = new Control('div', ['aside__slider']).element;

    const sliderHeader = new Control('h2', [],type === 'year' ?
      'Год выпуска' : 'Количество товара').element;


    const slider = document.createElement('div');
    noUiSlider.create(slider, {
      start: [startMin, startMax],
      tooltips: true,
      connect: true,
      range: {
        'min': rangeMin,
        'max': rangeMax
      },
      format: {
        to: function (value): number {
          return parseInt(value.toString());
        },
        from: function (value): number {
          return parseInt(value.toString());
        }
      }
    });

    this.sliderNoUi = (slider as noUiSlider.target).noUiSlider as noUiSlider.API;
    this.sliderNoUi.on('change', () => {
      [this.left, this.right] = (this.sliderNoUi as noUiSlider.API).get() as Array<number>;
      this.onChangeCallBack();
    });

    sliderWrapper.append(sliderHeader, slider)
    return sliderWrapper;
  }
}