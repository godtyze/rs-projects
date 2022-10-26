import {AnimationMap, CarInfo, WinnerCar} from "../types/types";
import {getCars, getWinners} from "../api/api";

export default class Store {
  static garagePage = 1;

  static winnersPage = 1;

  static createInputTextValue = '';

  static createInputColorValue = '';

  static sort: 'wins' | 'time' | '' = '';

  static order: 'ASC' | 'DESC' | '' = '';

  static updateInputTextValue = '';

  static updateInputColorValue = '';

  static cars: Array<CarInfo> = [];

  static carsCount = 0;

  static selectedCar?: CarInfo;

  static animation: AnimationMap = {};

  static winners: Array<WinnerCar> = [];

  static winnersCount = 0;

  static onWinnersUpdate?: () => void;

  static async getValues(): Promise<void> {
    const responseCars = await getCars(Store.garagePage);
    Store.cars = responseCars.items;
    Store.carsCount = responseCars.count;

    const responseWinners = await getWinners(Store.winnersPage, Store.sort, Store.order);
    Store.winners = responseWinners.items;
    Store.winnersCount = responseWinners.count;

    if (this.onWinnersUpdate) this.onWinnersUpdate();
  }
}