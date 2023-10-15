import { FiltersState } from '../../store/initialState';

export const getVisibleServices = (state: FiltersState) => {
  if (state.banks.chosen) {
    return state.banks.services.filter(
      (service) => service.clentId === getChosenCheckBox(state)
    );
  } else {
    return state.itms.services;
  }
};

export const getChosenServices = (state: FiltersState) => {
  if (isBanks(state)) {
    return state.banks.services.filter((service) => service.chosen);
  }
};

export const getChosenCheckBox = (state: FiltersState) =>
  state.banks.filters.find((filter) => filter.checked)?.id;

export const getCheckBoxes = (state: FiltersState) => {
  if (isBanks(state)) {
    return state.banks.filters;
  }

  return [];
};

export const isBanks = (state: FiltersState) => state.banks.chosen;
