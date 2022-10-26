import Control from "../../../../utils/control";
import Button from "../../../button/button";
import Input from "../../../input/input";
import Store from "../../../../store/store";
import './inputs-field.scss';
import { disableBtn, enableBtn } from "../../../../utils/utils";
import { CarInfo, newCar } from "../../../../types/types";


export default class InputsField extends Control {
  readonly createInputText: Input;
  readonly createInputColor: Input;
  readonly createCarButton: Button;
  readonly updateInputText: Input;
  readonly updateInputColor: Input;
  readonly updateCarButton: Button;
  readonly startRaceButton: Button;
  readonly resetRaceButton: Button;
  readonly generateCarsButton: Button;

  constructor() {
    super('div', ['garage__inputs']);
    this.createInputText = new Input('text', ['inputs__create-name'], 'Input car name');
    this.createInputColor = new Input('color', ['inputs__create-color']);
    this.createCarButton = new Button('Create', ['inputs__create-btn'], true);
    this.updateInputText = new Input('text', ['inputs__update-name'], 'Input car name');
    this.updateInputColor = new Input('color', ['inputs__update-color']);
    this.updateCarButton = new Button('Update', ['inputs__update-btn'], true);
    this.startRaceButton = new Button('Start race', ['garage__btn']);
    this.resetRaceButton = new Button('Reset race', ['garage__btn', 'reset'], true);
    this.generateCarsButton = new Button('100 Random cars', ['garage__btn']);
    this.render();
  }

  private render(): void {
    const garageCreateInputs = [
      this.createInputText,
      this.createInputColor,
      this.createCarButton
    ];
    const garageUpdateInputs = [
      this.updateInputText,
      this.updateInputColor,
      this.updateCarButton
    ];

    const garageButtons = [
      this.startRaceButton,
      this.resetRaceButton,
      this.generateCarsButton
    ];

    const createInputsContainer = new Control('div', ['garage__inputs-create']);
    garageCreateInputs.forEach(el => createInputsContainer.element.append(el.element));

    const updateInputsContainer = new Control('div', ['garage__inputs-update']);
    garageUpdateInputs.forEach(el => updateInputsContainer.element.append(el.element));

    const inputsContainer = new Control('div', ['garage__inputs']);
    inputsContainer.element.append(createInputsContainer.element, updateInputsContainer.element);

    const buttonsContainer = new Control('div', ['garage__buttons']);
    garageButtons.forEach(el => buttonsContainer.element.append(el.element));

    this.createInputHandler();

    this.element.append(
      inputsContainer.element,
      buttonsContainer.element
    );
  }

  createInputHandler(): void {
    this.createInputText.element.addEventListener('input', () => {
      const input = this.createInputText.element as HTMLInputElement;
      Store.createInputTextValue = input.value.trim();
      enableBtn([this.createCarButton.element]);
      if (!Store.createInputTextValue) disableBtn([this.createCarButton.element]);
    });

    this.createInputColor.element.addEventListener('input', () => {
      const input = this.createInputColor.element as HTMLInputElement;
      Store.createInputColorValue = input.value;
    });
  }

  updateInputHandler(car: CarInfo): void {
    const input = this.updateInputText.element as HTMLInputElement;
    input.value = car.name;
    Store.updateInputTextValue = car.name;

    const color = this.updateInputColor.element as HTMLInputElement;
    color.value = car.color;
    Store.updateInputColorValue = car.color;

    enableBtn([this.updateCarButton.element]);

    this.updateInputText.element.addEventListener('input', () => {
      const input = this.updateInputText.element as HTMLInputElement;
      Store.updateInputTextValue = input.value.trim();
      if (!input.value) disableBtn([this.updateCarButton.element]);
    });

    this.updateInputColor.element.addEventListener('input', () => {
      const input = this.updateInputColor.element as HTMLInputElement;
      Store.updateInputColorValue = input.value;
    });
  }

  getCreateInputValues(): newCar {
    return {
      name: Store.createInputTextValue,
      color: Store.createInputColorValue
    }
  }

  getUpdatedInputValues = (): newCar => {
    if (!Store.selectedCar) throw new Error("There's no selected car");
    return {
      name: Store.updateInputTextValue,
      color: Store.updateInputColorValue
    };
  };
}