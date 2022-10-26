import Control from "../../../../utils/control";
import Store from "../../../../store/store";
import Car from "./car/car";
import { CarInfo } from "../../../../types/types";

export default class CarsField extends Control {
  constructor(select: (car: CarInfo) => void = () => {}, remove: (car: CarInfo) => void = () => {},) {
    super('div', ['garage__cars-field']);
    Store.cars.forEach(car => this.element.append(new Car(car, select, remove).element));
  }
}