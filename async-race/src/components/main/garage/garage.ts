import InputsField from "./inputs-field/inputs-field";
import Control from "../../../utils/control";
import './garage.scss';
import Store from "../../../store/store";
import CarsField from "./cars-field/cars-field";
import {createCar, createWinner, deleteCar, deleteWinner, updateCar, updateWinner} from "../../../api/api";
import {CarInfo, newCar, Race} from "../../../types/types";
import { disableBtn, enableBtn, getRandomColor, getRandomName, startDrive, stopDrive } from "../../../utils/utils";
import Pagination from "../../pagination/pagination";
import ModalWindow from "../../modal-window/modal-window";
import consts from "../../../consts/consts";

export default class Garage extends Control {
  readonly inputsField: InputsField;

  carsCounter: Control;

  pagesField: Pagination

  carsField: CarsField;

  modalWindow: ModalWindow;

  constructor() {
    super('main', ['main', 'garage']);
    this.inputsField = new InputsField();
    this.carsCounter = new Control('h2', ['garage__title'], `Cars in garage: ${Store.carsCount}`);
    this.carsField = new CarsField();
    this.pagesField = new Pagination(['garage__pages']);
    this.modalWindow = new ModalWindow();

    this.handleCreateCarBtn();
    this.handleUpdateCarBtn();
    this.handleCreateRandomCarsBtn();
    this.handleRaceBtn();
    this.handleResetBtn();
    this.handlePageButtons();

    this.render();
  }

  private render() {
    this.element.innerHTML = '';
    this.carsField = new CarsField(
      (car: CarInfo) => {
        Store.selectedCar = car;
        this.inputsField.updateInputHandler(car);
      },
      (car: CarInfo) => {
        deleteCar(+car.id).then(async () => {
          await deleteWinner(+car.id);
          await Store.getValues();
          this.render();
        });
      }
    );
    this.carsCounter = new Control('h2', ['garage__title'], `Cars in garage: ${Store.carsCount}`);
    this.pagesField = new Pagination(['garage__pages']);

    this.handlePageButtons();

    this.element.append(
      this.inputsField.element,
      this.carsCounter.element,
      this.pagesField.element,
      this.carsField.element
    );
  }

  handleCreateCarBtn(): void {
    this.inputsField.createCarButton.element.addEventListener('click', () => {
      const newCar = this.inputsField.getCreateInputValues();
      createCar(newCar).then(async () => {
        await Store.getValues();
        (this.inputsField.createInputText.element as HTMLInputElement).value = '';
        (this.inputsField.createInputColor.element as HTMLInputElement).value = '#000000';
        Store.createInputTextValue = '';
        Store.createInputColorValue = '#000000';
        disableBtn([this.inputsField.createCarButton.element]);
        this.render();
      })
    });
  }

  handleUpdateCarBtn(): void {
    this.inputsField.updateCarButton.element.addEventListener('click', () => {
      const updatedCar = this.inputsField.getUpdatedInputValues();
      if (Store.selectedCar) {
        updateCar(+Store.selectedCar.id, updatedCar).then(async () => {
          await Store.getValues();
          Store.selectedCar = undefined;
          (this.inputsField.updateInputText.element as HTMLInputElement).value = '';
          (this.inputsField.updateInputColor.element as HTMLInputElement).value = '#000000';
          Store.updateInputTextValue = '';
          Store.updateInputColorValue = '#000000';
          disableBtn([this.inputsField.updateCarButton.element]);
          this.render();
        });
      }
    });
  }

  handleCreateRandomCarsBtn(): void {
    this.inputsField.generateCarsButton.element.addEventListener('click', async () => {
      const randomCars: Array<newCar> = new Array(consts.randomCarsCount).fill(0)
        .map(() => ({ name: getRandomName(), color: getRandomColor() }));
      await randomCars.forEach(car => createCar(car));
      await Store.getValues();
      this.render();
    });
  }

  handleRaceBtn(): void {
    this.inputsField.startRaceButton.element.addEventListener('click', async () => {
      let winner = false;

      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => disableBtn([btn]));

      const race = await Promise.all(Store.cars.map(async car => {
        const drive = await startDrive(+car.id);

        if (drive.success && !winner) {
          enableBtn([this.inputsField.resetRaceButton.element]);
          const winnerTime = drive.animationTime / consts.millisecondInSecond;
          const winnerCar = Store.cars.find(car => +car.id === drive.id);
          await this.addWinnerToTable(drive, winnerTime, winnerCar);
          this.handleModalWindow(true, winnerCar, winnerTime);
          winner = true;
        }

        return drive.success;
      }));

      if (race.every(raceRes => !raceRes)) {
        this.handleModalWindow(false);
        enableBtn([this.inputsField.resetRaceButton.element]);
      }
    });
  }

  handleResetBtn(): void {
    this.inputsField.resetRaceButton.element.addEventListener('click', async () => {
      await Promise.all(Store.cars.map(car => stopDrive(+car.id)));

      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
        if (!btn.classList.contains('reset')) {
          enableBtn([btn]);
        }
      });

      disableBtn([this.inputsField.resetRaceButton.element]);
    });
  }

  handlePageButtons(): void {
    this.pagesField.prevPageBtn.element.addEventListener('click', async () => {
      if (Store.garagePage !== 1) {
        Store.garagePage--;
        await Store.getValues();
        this.render();
      }
    });

    this.pagesField.nextPageBtn.element.addEventListener('click',  async () => {
      if (Store.garagePage * consts.maxCarsOnPage < Store.carsCount) {
        Store.garagePage++;
        await Store.getValues();
        this.render();
      }
    });
  }

  handleModalWindow(isWinner = true, winnerCar?: CarInfo, winTime?: number): void {
    const message = isWinner
      ? `${winnerCar?.name} won with ${winTime}s`
      : `All cars are broken`;
    this.modalWindow.render(message);
  }

  async addWinnerToTable(state: Race, winnerTime: number, winnerCar?: CarInfo): Promise<void> {
    let winner = Store.winners.find(car => +car.id === state.id);
    if (!winner && winnerCar) {
      winner = {
        id: +winnerCar.id,
        wins: 1,
        time: winnerTime
      }
      await createWinner(winner);
      await Store.getValues();
    } else if (winner) {
      winner.wins++;
      if (winner.time > winnerTime) winner.time = winnerTime;
      await updateWinner(winner.id, winner);
      await Store.getValues();
    }
  }
}