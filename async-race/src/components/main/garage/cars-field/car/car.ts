import Control from "../../../../../utils/control";
import Button from "../../../../button/button";
import { CarInfo } from "../../../../../types/types";
import {disableBtn, enableBtn, renderCar, startDrive, stopDrive} from "../../../../../utils/utils";
import './car.scss';

export default class Car extends Control {
  name: string;

  color: string;

  id: string;

  selectButton: Button;

  removeButton: Button;

  startButton: Button;

  resetButton: Button;

  car: CarInfo;

  carWrapper: HTMLElement;

  constructor(car: CarInfo, select: (car: CarInfo) => void = () => {}, remove: (car: CarInfo) => void = () => {}) {
    super('div', ['car__wrapper']);
    this.car = car;
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;
    this.selectButton = new Button('Select', ['car__btn']);
    this.removeButton = new Button('Remove', ['car__btn']);
    this.startButton = new Button('Start', ['car__btn']);
    this.resetButton = new Button('Reset', ['car__btn', 'reset'], true);
    this.carWrapper = renderCar(this.color, this.id);

    this.selectButton.element.addEventListener('click', () => select(this.car))
    this.removeButton.element.addEventListener('click', () => remove(this.car))

    this.render();
  }

  private render() {
    const singleRaceButtons = new Control('div', ['car__race-buttons']).element;
    const carName = new Control('h3', ['car__name'], this.car.name).element;
    [this.startButton.element, this.resetButton.element, carName].forEach(el => singleRaceButtons.append(el));

    const settingButtons = new Control('div', ['car__settings-buttons']).element;
    [this.selectButton.element, this.removeButton.element].forEach(el => settingButtons.append(el));

    const carContainer = new Control('div', ['car__container']).element;
    carContainer.append(settingButtons, this.carWrapper);

    this.handleStartButton();
    this.handleResetButton();

    this.element.append(carName, singleRaceButtons, carContainer);
  }

  handleStartButton(): void {
    this.startButton.element.addEventListener('click', async () => {
      enableBtn([this.resetButton.element]);
      disableBtn([this.startButton.element, this.selectButton.element, this.removeButton.element]);
      await startDrive(+this.id);
    });
  }

  handleResetButton(): void {
    this.resetButton.element.addEventListener('click', async () => {
      await stopDrive(+this.id);
      enableBtn([this.startButton.element, this.selectButton.element, this.removeButton.element]);
      disableBtn([this.resetButton.element]);
    });
  }
}