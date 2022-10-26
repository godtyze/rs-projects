import { CarInfo, DriveRes, EngineRes, GetCarsRes, GetWinnersRes, newCar, newWinnerCar } from "../types/types";
import { getSortOrder } from "../utils/utils";
import consts from "../consts/consts";

const paths = {
  garage:`${consts.host}/garage`,
  winners:`${consts.host}/winners`,
  engine:`${consts.host}/engine`
}

export const getCars = async (page: number, limit= consts.maxCarsOnPage): Promise<GetCarsRes> => {
  const res = await fetch(`${paths.garage}?_page=${page}&_limit=${limit}`);
  const data = await res.json();

  return {
    items: data,
    count: +(res.headers.get('X-Total-Count') || 0)
  };
};

export const createCar = async (body: newCar): Promise<void> => {
  await fetch(paths.garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });
};

export const updateCar = async (id: number, body: newCar): Promise<void> => {
  await fetch(`${paths.garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${paths.garage}/${id}`, {
    method: 'DELETE'
  });
};

export const handleEngine = async (id: number, status: 'started' | 'stopped'): Promise<EngineRes> => {
  const res = await fetch(`${paths.engine}?id=${id}&status=${status}`, {
    method: 'PATCH'
  });
  const data = await res.json();

  return {
    velocity: data.velocity,
    distance: data.distance
  };
};

export const drive = async (id: number): Promise<DriveRes> => {
  const res = await fetch(`${paths.engine}?id=${id}&status=drive`, {
    method: 'PATCH'
  });

  return res.status === 200 ? { ...(await res.json()) } : { success: false };
}

export const getWinners = async (page: number, sort: string, order: string,  limit= consts.maxWinnersOnPage): Promise<GetWinnersRes> => {
  const res = await fetch(`${paths.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const data = await res.json();

  return {
    items: data,
    count: +(res.headers.get('X-Total-Count') || 0)
  };
}

export const createWinner = async (body: newWinnerCar): Promise<void> => {
  await fetch(paths.winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });
};

export const updateWinner = async (id: number, body: newWinnerCar): Promise<void> => {
  await fetch(`${paths.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${paths.winners}/${id}`, {
    method: 'DELETE'
  });
}

export const getCar = async (id: number): Promise<CarInfo> => {
  const res = await fetch(`${paths.garage}/${id}`)
  const data = await res.json();

  return {
    name: data.name,
    color: data.color,
    id: data.id
  };
}