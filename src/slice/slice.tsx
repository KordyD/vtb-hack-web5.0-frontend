import { getServices, getSortedOffices } from '../API/api';
import iconVtb from '/VTB-map-icon.svg';
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
  TipItem,
  Service,
} from '../store/initialState';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    serviceId: 1,
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
    serviceId: 2,
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
    serviceId: 3,
  },

  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Ипотека',
    subItems: [],
    serviceId: 4,
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
    serviceId: 5,
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Вклады и счета',
    subItems: [],
    serviceId: 6,
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Инвестиции',
    subItems: [],
    serviceId: 7,
  },
  {
    clentId: 'PF',
    chosen: false,
    expanded: false,
    name: 'Платежи и переводы',
    subItems: [{ name: 'Оплата услуг', chosen: false }],
    serviceId: 8,
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
    serviceId: 9,
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
    serviceId: 10,
  },
];

export const getServicesAsync = createAsyncThunk(
  'MainMenuAction/getServices',
  getServices
);

export const getOfficesAsync = createAsyncThunk(
  'MainMenuAction/getOffices',
  getSortedOffices
);

const initialState: InitialState = {
  clientGeoposition: {
    latitude: 55.7522,
    longitude: 37.6156,
  },
  loading: {
    loadingServices: false,
    loadingOffices: false,
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
      services: [],
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
  inputTips: [],
  mainInputValue: '',
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

    // loadOffices: (state, action: PayloadAction<(Office | null)[]>) => {
    //   if (!action.payload.some((item) => item === null)) {
    //     state.offices.offices = action.payload.map((office) => ({
    //       address: office!.address,
    //       img: office!.img,
    //       distance: office!.distance,
    //       id: office!.id,
    //     }));
    //   }
    // },

    setDistances: (
      state,
      action: PayloadAction<{ id: number; distance: number }>
    ) => {
      if (action.payload) {
        state.offices.offices;
        state.offices.offices.find(
          (item) => item.id === action.payload.id
        )!.distance = action.payload.distance;
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

    setTips: (state, action: PayloadAction<TipItem[]>) => {
      state.inputTips = action.payload;
    },

    setMainInput: (state, action: PayloadAction<string>) => {
      state.mainInputValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getServicesAsync.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.filters.banks.services = action.payload.map((item: Service) => {
            return {
              clentId: 'PF',
              name: item.serviceName,
              chosen: false,
              expanded: false,
              subItems: [],
              serviceId: item.serviceId,
            };
          });
          state.loading.loadingServices = false;
        }
      )
      .addCase(getServicesAsync.rejected, (state, action) => {
        state.filters.banks.services = banksServices;
        state.loading.loadingServices = false;
      })

      .addCase(getServicesAsync.pending, (state, action) => {
        state.loading.loadingServices = true;
      });

    builder
      .addCase(
        getOfficesAsync.fulfilled,
        (state, action: PayloadAction<Office[]>) => {
          state.offices.offices = action.payload.map((item) => {
            return {
              address: item.address,
              charts: item.charts,
              id: item.id,
              latitude: item.latitude,
              longitude: item.longitude,
              metroStation: item.metroStation,
              officeType: item.officeType,
              salePointName: item.salePointName,
              services: item.services,
              status: item.status,
              worksTime: item.worksTime,
              img: iconVtb,
            };
          });
          state.loading.loadingOffices = false;
        }
      )
      .addCase(getOfficesAsync.rejected, (state, action) => {
        state.loading.loadingOffices = false;
      })
      .addCase(getOfficesAsync.pending, (state, action) => {
        state.loading.loadingOffices = true;
      });
  },
});
export const {
  toggleFilters,
  // loadOffices,
  expandFilter,
  switchOption,
  setClientPosition,
  collapseAllFilters,
  chooseItem,
  toggleCheckBox,
  setDistances,
  chooseOffice,
  setMainInput,
  setTips,
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
