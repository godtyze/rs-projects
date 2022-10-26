import './main.scss';
import Control from "../../utils/control";
import Garage from "./garage/garage";
import Winners from "./winners/winners";

export default class Main extends Control {
  readonly garage: Garage;
  readonly winners: Winners;

  constructor() {
    super('main', ['main']);
    this.garage = new Garage();
    this.winners = new Winners();
    this.render();
  }

  private render() {
    this.element.append(
      this.garage.element,
      this.winners.element
    );
  }
}