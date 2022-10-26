import Control from "../../../utils/control";
import './winners.scss';
import Table from "./table/table";
import Pages from "../../pages/pages";
import Store from "../../../store/store";
import consts from "../../../consts/consts";

export default class Winners extends Control {
  winnersTable: Table;

  winnersCounter: Control;

  totalWins: Control;

  bestTime: Control;

  pagesField: Pages;


  constructor() {
    super('section', ['winners']);
    this.winnersTable = new Table();
    this.winnersCounter = new Control('h2', ['winners__title'], `Winners: ${Store.winnersCount}`);
    this.pagesField = new Pages(['winners__pages']);
    this.totalWins = new Control('div', ['table-header__wins'], 'Wins Counter');
    this.bestTime = new Control('div', ['table-header__best-time'], 'Best time');

    Store.onWinnersUpdate = (): void => {
      this.render();
    }

    this.render();
  }

  private render(): void {
    this.element.innerHTML = '';
    this.pagesField = new Pages(['winners__pages']);
    this.winnersCounter = new Control('h2', ['winners__title'], `Winners: ${Store.winnersCount}`);
    this.totalWins = new Control('div', ['table-header__wins'], 'Wins Counter');
    this.bestTime = new Control('div', ['table-header__best-time'], 'Best time');
    this.winnersTable = new Table();

    const columnNumber = new Control('div', ['table-header__num'], '№').element;
    const columnCarImage = new Control('div', ['table-header__image'], 'Car image').element;
    const columnCarName = new Control('div', ['table-header__name'], 'Car name').element;

    const tableHeaderWrapper = new Control('div', ['table-header']).element;
    tableHeaderWrapper.append(columnNumber, columnCarImage, columnCarName, this.totalWins.element, this.bestTime.element);

    this.handleSortTable();
    this.handlePageButtons();

    this.element.append(
      this.winnersCounter.element,
      this.pagesField.element,
      tableHeaderWrapper,
      this.winnersTable.element
    );
  }

  handleSortTable(): void {
    this.totalWins.element.addEventListener('click', async () => {
      Store.order = Store.order === 'ASC' ? 'DESC' : 'ASC';
      Store.sort = 'wins';
      await Store.getValues();
      this.render();
    });

    this.bestTime.element.addEventListener('click', async () => {
      Store.order = Store.order === 'ASC' ? 'DESC' : 'ASC';
      Store.sort = 'time';
      await Store.getValues();
      this.render();
    });
  }

  handlePageButtons(): void {
    this.pagesField.prevPageBtn.element.addEventListener('click', async () => {
      if (Store.winnersPage !== 1) {
        Store.winnersPage--;
        await Store.getValues();
        this.render();
      }
    });
    this.pagesField.nextPageBtn.element.addEventListener('click', async () => {
      if (Store.winnersPage * consts.maxWinnersOnPage < Store.winnersCount) {
        Store.winnersPage++;
        await Store.getValues();
        this.render();
      }
    });
  }
}