import Control from "../../../../utils/control";
import Store from "../../../../store/store";
import { getCar } from "../../../../api/api";
import Winner from "./winner/winner";
import './table.scss';
import consts from "../../../../consts/consts";

export default class Table extends Control {
  constructor() {
    super('div', ['winners__table']);

    this.render().catch();
  }

  private async render(): Promise<void> {
    const winners = await Promise.all(Store.winners.map(winner => getCar(winner.id)));
    winners.forEach((winner, idx) => {
      const tableWinnerNumber = (Store.winnersPage - 1) * consts.maxWinnersOnPage + (idx + 1);
      const newWinner = new Winner().render(tableWinnerNumber, Store.winners[idx], winner).element;
      this.element.append(newWinner);
    });
  }
}