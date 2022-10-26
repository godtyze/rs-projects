import sprite from '../assets/svg/cars/cars-sprite.svg'
import Control from "./control";
import { Race, State } from "../types/types";
import {drive, handleEngine} from "../api/api";
import Store from "../store/store";

const carModels = [
  'Tesla',
  'Mersedes',
  'BMW',
  'Toyota',
  'Zhiguli',
  'Moskvich',
  'Opel',
  'Aston Martin',
  'Porshe',
  'Lada',
];

const carNames = [
  'Model S',
  'CLK',
  '7',
  'Camry',
  'Combi',
  '9',
  'Corsa',
  'DB9',
  'Cayene',
  'Calina',
];

export const getRandomName = (): string => {
  const model = carModels[Math.floor(Math.random() * carModels.length)];
  const name = carNames[Math.floor(Math.random() * carNames.length)];
  return `${model} ${name}`;
};

export const getRandomColor = (): string => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }
  return color;
};

export const disableBtn = (buttons: Array<HTMLElement | Element>): void => {
  buttons.forEach(btn => btn.setAttribute('disabled', ''));
};

export const enableBtn = (buttons: Array<HTMLElement | Element>): void => {
  buttons.forEach(btn => btn.removeAttribute('disabled'));
};

export const renderCar = (color: string, id: string): HTMLElement => {
  const wrapper = new Control('div', ['car__img']).element;
  wrapper.innerHTML = `<svg class="car" id="car-${id}" width="100" height="35"><use xlink:href="${sprite}#car-02" fill="${color}"></use></svg>`;
  return wrapper;
};

const animateCar = (id: number, car: HTMLElement, animationTime: number): State => {
  let start: number | undefined;
  const state: State = { step: 0 };

  const step = (timestamp: number): void => {
    const maxDistance = 100;

    if (!start) start = timestamp;

    const progress = timestamp - start;
    const totalDistancePassed = (progress * maxDistance) / animationTime;

    car.style.left = `${Math.min(totalDistancePassed, maxDistance)}%`;
    if (totalDistancePassed < maxDistance) {
      state.step = window.requestAnimationFrame(step);
    }
  };

  state.step = window.requestAnimationFrame(step);
  return state;
};

export const startDrive = async (id: number): Promise<Race> => {
  const { velocity, distance } = await handleEngine(id, 'started');

  const animationTime = Math.floor(distance / velocity);
  const car = document.getElementById(`car-${id}`);

  if (!car) throw new Error('no such car!');

  Store.animation[id] = animateCar(id, car, animationTime);

  const driveRes = await drive(id);

  if (!driveRes.success) window.cancelAnimationFrame(Store.animation[id].step);

  return { success: driveRes.success, id, animationTime };
};

export const stopDrive = async (id: number): Promise<void> => {
  const car = document.getElementById(`car-${id}`);
  await handleEngine(id, 'stopped');
  window.cancelAnimationFrame(Store.animation[id].step);
  if (car) car.style.left = '0';
};

export const getSortOrder = (sort: string, order: string): string => {
  return sort && order ? `&_sort=${sort}&_order=${order}` : '';
};