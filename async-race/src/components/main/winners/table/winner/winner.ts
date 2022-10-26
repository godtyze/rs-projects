import Control from "../../../../../utils/control";
import { CarInfo, WinnerCar } from "../../../../../types/types";
import { renderCar } from "../../../../../utils/utils";
import './winner.scss';


export default class Winner extends Control {
  constructor() {
    super('div', ['row']);
  }

  render(number: number, winner: WinnerCar, car: CarInfo): Winner {
    const winnerNumber = new Control('div', ['row-number'], `${number}`).element;
    const carImage = renderCar(car.color, car.id);
    const carName = new Control('div', ['row-name'], car.name).element;
    const winsCount = new Control('div', ['row-wins'], `${winner.wins}`).element;
    const time = new Control('div', ['row-time'], `${winner.time}`).element;

    this.element.append(
      winnerNumber,
      carImage,
      carName,
      winsCount,
      time
    );

    return this;
  }
}