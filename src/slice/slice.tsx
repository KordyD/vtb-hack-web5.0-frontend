import { ExpandFilterAction } from '../actions/servicesMenuActions';
import {
  InitialState,
  MainMenuAction,
  Platform,
  Office,
  ServiceItem,
} from '../store/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const banksServices: ServiceItem[] = [
  {
    expanded: false,
    name: 'Кредиты',
    subItems: [
      { name: 'Кредит наличными' },
      { name: 'Экспресс кредит' },
      { name: 'Рефинансирование' },
    ],
  },
  {
    expanded: false,
    name: 'Вклады',
    subItems: [{ name: 'Рассчитать кредит' }, { name: 'Кредит наличными' }],
  },
  {
    expanded: false,
    name: 'Карты',
    subItems: [
      { name: 'Дебетовые карты' },
      { name: 'Кредитные карты' },
      { name: 'Пенсионные карты' },
      { name: 'Карты жителя' },
    ],
  },

  { expanded: false, name: 'Ипотека', subItems: [] },
  {
    expanded: false,
    name: 'Автокредиты',
    subItems: [
      { name: 'Автокредит наличными' },
      { name: 'Автокредит в автосалоне' },
    ],
  },
  { expanded: false, name: 'Вклады и счета', subItems: [] },
  { expanded: false, name: 'Инвестиции', subItems: [] },
  {
    expanded: false,
    name: 'Платежи и переводы',
    subItems: [{ name: 'Оплата услуг' }],
  },
  {
    expanded: false,
    name: 'Другие услуги',
    subItems: [
      { name: 'Страховые и сервисные продукты' },
      { name: 'Аренда сейфовых ячеек' },
      { name: 'Банкротство физических лиц' },
    ],
  },
  {
    expanded: false,
    name: 'Валюта и золото',
    subItems: [
      { name: 'Купить валюту' },
      { name: 'Продать валюту' },
      { name: 'Купить золото' },
    ],
  },
];

const initialState: InitialState = {
  platform: Platform.DESKTOP,
  search: {},
  filters: {
    opened: false,
    banks: {
      chosen: true,
      filters: [],
      services: banksServices,
    },
    itms: {
      chosen: false,
      filters: [],
      services: [],
    },
  },
  tags: [],
  offices: {
    offices: [],
  },
  chosenOffice: null,
};

export const mainMenuSlice = createSlice({
  name: MainMenuAction,
  initialState: initialState,
  reducers: {
    toggleFilters: (state) => {
      state.filters.opened = !state.filters.opened;
    },

    expandFilter: (state, action: PayloadAction<ExpandFilterAction>) => {
      if (action.payload.isBanks) {
        state.filters.banks.services = expandParticularService(
          state.filters.banks.services,
          action
        );
      } else {
        state.filters.itms.services = expandParticularService(
          state.filters.banks.services,
          action
        );
      }
    },

    switchOption: (state, action: PayloadAction<boolean>) => {
      state.filters.banks.chosen = action.payload;
      state.filters.itms.chosen = !action.payload;
    },

    loadOffices: (state, action: PayloadAction<(Office | null)[]>) => {
      if (!action.payload.some((item) => item === null)) {
        state.offices.offices = action.payload.map((office) => ({
          address: office!.address,
          img: office!.img,
          distance: office!.distance,
          id: office!.id,
        }));
      }
    },

    setDistances: (
      state,
      action: PayloadAction<{ id: number; distance: number }>
    ) => {
      if (action.payload) {
        state.offices.offices[action.payload.id].distance =
          action.payload.distance;
      }
    },

    chooseOffice: (state, action: PayloadAction<number>) => {
      if (action.payload !== null) {
        state.chosenOffice = action.payload;
      }
    },
  },
});
export const {
  toggleFilters,
  loadOffices,
  expandFilter,
  switchOption,
  chooseOffice,
  setDistances,
} = mainMenuSlice.actions;

export default mainMenuSlice.reducer;

function expandParticularService(
  services: ServiceItem[],
  action: { payload: ExpandFilterAction; type: string }
) {
  return services.map((service, index) => {
    if (index === action.payload.menuItemKey) {
      return { ...service, expanded: true };
    }
    return { ...service, expanded: false };
  });
}
