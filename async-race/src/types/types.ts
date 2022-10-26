export type CarInfo = {
  name: string;
  color: string;
  id: string;
}

export type newCar = Omit<CarInfo, 'id'>

export type GetCarsRes = {
  items: Array<CarInfo>;
  count: number;
}

export type EngineRes = {
  velocity: number;
  distance: number;
}

export type DriveRes = {
  success: boolean | Array<CarInfo>;
}

export type Race = {
  success: boolean | Array<CarInfo>;
  id: number;
  animationTime: number;
}

export type State = {
  step: number;
}

export type AnimationMap = {
  [key: string]: State;
}

export type WinnerCar = {
  id: number;
  wins: number;
  time: number;
}

export type newWinnerCar = Omit<WinnerCar, 'id'>;

export type GetWinnersRes = {
  items: Array<WinnerCar>;
  count: number;
}