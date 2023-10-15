const url = 'https://w07bp3fp-8080.euw.devtunnels.ms/data/';

export const getServices = async () => {
  const response = await fetch(`${url}services`);
  const data = await response.json();
  return data;
};
