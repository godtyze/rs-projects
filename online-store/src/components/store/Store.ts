import { Color, selectFiltersByValue, Shape, Size } from "../../types/types";

export default abstract class Store {
  static query = localStorage.getItem('query') ? localStorage.getItem('query') : '';

  static selectFiltersByValue: selectFiltersByValue = localStorage.getItem('selectFiltersByValue') ?
    JSON.parse(localStorage.getItem('selectFiltersByValue') as string) : { shape: [], color: [], size: [] };

  static pickedCards = JSON.parse(localStorage.getItem('pickedCards') as string) || [];

  static counter = +(localStorage.getItem('cartCounter') as string);

  static sort = localStorage.getItem('sort') || 'По названию(А-Я)';

  static addSelectFilter(val: Shape | Size | Color, type: 'color' | 'shape' | 'size') {
    (Store.selectFiltersByValue[type] as Array<Shape | Size | Color>).push(val);
  }

  static removeSelectFilter(val: Shape | Size | Color, type: 'color' | 'shape' | 'size') {
    (Store.selectFiltersByValue[type] as Array<Shape | Size | Color>)
      .splice((Store.selectFiltersByValue[type] as Array<Shape | Size | Color>).indexOf(val), 1);
  }

  static addPickedCards(data: string): void {
    Store.pickedCards.push(data);
  }

  static removePickedCards(data: string): void {
    Store.pickedCards.splice(Store.pickedCards.indexOf(data), 1);
  }
}