const url = 'https://localhost:8080/data/';

export interface Params {
  servicesIds: number[];
  latitude: number;
  longitude: number;
  startTime?: string;
  endTime?: string;
  limit: number;
}

export const getServices = async () => {
  const response = await fetch(`${url}services`);
  const data = await response.json();
  return data;
};

export const getOffices = async () => {
  const response = await fetch(`${url}offices`);
  const data = await response.json();
  return data;
};

export const getSortedOffices = async (body: Params) => {
  console.log(body);
  const response = await fetch(`${url}offices/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
