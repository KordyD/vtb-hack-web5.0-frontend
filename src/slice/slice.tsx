import {
  ChooseServiceAction,
  ExpandFilterAction,
} from '../actions/servicesMenuActions';
import {
  InitialState,
  MainMenuAction,
  Platform,
  Office,
  ServiceItem,
  Geoposition,
} from '../store/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const banksServices: ServiceItem[] = [
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Кредиты',
    subItems: [
      { name: 'Кредит наличными', chosen: false },
      { name: 'Экспресс кредит', chosen: false },
      { name: 'Рефинансирование', chosen: false },
    ],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Вклады',
    subItems: [
      { name: 'Рассчитать кредит', chosen: false },
      { name: 'Кредит наличными', chosen: false },
    ],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Карты',
    subItems: [
      { name: 'Дебетовые карты', chosen: false },
      { name: 'Кредитные карты', chosen: false },
      { name: 'Пенсионные карты', chosen: false },
      { name: 'Карты жителя', chosen: false },
    ],
  },

  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Ипотека',
    subItems: [],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Автокредиты',
    subItems: [
      { name: 'Автокредит наличными', chosen: false },
      { name: 'Автокредит в автосалоне', chosen: false },
    ],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Вклады и счета',
    subItems: [],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Инвестиции',
    subItems: [],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Платежи и переводы',
    subItems: [{ name: 'Оплата услуг', chosen: false }],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Другие услуги',
    subItems: [
      { name: 'Страховые и сервисные продукты', chosen: false },
      { name: 'Аренда сейфовых ячеек', chosen: false },
      { name: 'Банкротство физических лиц', chosen: false },
    ],
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Валюта и золото',
    subItems: [
      { name: 'Купить валюту', chosen: false },
      { name: 'Продать валюту', chosen: false },
      { name: 'Купить золото', chosen: false },
    ],
  },
];

const initialState: InitialState = {
  clientGeoposition: {
    latitude: 0,
    longitude: 0,
  },
  platform: Platform.DESKTOP,
  search: {},
  filters: {
    opened: false,
    banks: {
      chosen: true,
      filters: [
        {
          id: 'PF',
          name: 'Физические лица',
          checked: true,
        },
        {
          id: 'LF',
          name: 'Юридические лица',
          checked: false,
        },
      ],
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

    setClientPosition: (state, action: PayloadAction<Geoposition>) => {
      state.clientGeoposition = action.payload;
    },

    collapseAllFilters: (state) => {
      state.filters.banks.services = state.filters.banks.services.map(
        (service) => ({ ...service, expanded: false })
      );
    },

    chooseItem: (state, action: PayloadAction<ChooseServiceAction>) => {
      const { itemName, subItemName, isBanks, chosen } = action.payload;
      if (subItemName === undefined) {
        if (isBanks) {
          state.filters.banks.services = state.filters.banks.services.map(
            setServiceChosen(itemName, chosen)
          );
        } else {
          state.filters.itms.services = state.filters.itms.services.map(
            setServiceChosen(itemName, chosen)
          );
        }
      } else {
        if (isBanks) {
          state.filters.banks.services = state.filters.banks.services.map(
            setServiceSubItemChosen(itemName, subItemName!, chosen)
          );
        } else {
          state.filters.itms.services = state.filters.itms.services.map(
            setServiceSubItemChosen(itemName, subItemName!, chosen)
          );
        }
      }
    },

    toggleCheckBox: (state, action: PayloadAction<string>) => {
      state.filters.banks.filters = state.filters.banks.filters.map(
        (checkBox) => {
          if (checkBox.id === action.payload) {
            checkBox.checked = true;
          } else {
            checkBox.checked = false;
          }

          return { ...checkBox };
        }
      );
    },
  },
});
export const {
  toggleFilters,
  loadOffices,
  expandFilter,
  switchOption,
  setClientPosition,
  collapseAllFilters,
  chooseItem,
  toggleCheckBox,
  setDistances,
  chooseOffice,
} = mainMenuSlice.actions;

export default mainMenuSlice.reducer;

function setServiceChosen(itemName: string, chosen: boolean) {
  return (service: ServiceItem) => {
    if (service.name === itemName) {
      service.chosen = chosen;
    }
    return { ...service };
  };
}

function setServiceSubItemChosen(
  itemName: string,
  subItemName: string,
  chosen: boolean
) {
  return (service: ServiceItem) => {
    if (service.name == itemName) {
      service.subItems = service.subItems.map((subItem) => {
        if (subItem.name === subItemName) {
          subItem.chosen = chosen;
        }
        return { ...subItem };
      });
      service.chosen = service.subItems.some((subItem) => subItem.chosen);
    }
    return { ...service };
  };
}

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
