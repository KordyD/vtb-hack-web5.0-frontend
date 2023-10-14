import { ChooseServiceAction, ExpandFilterAction } from "../actions/servicesMenuActions";
import { InitialState, MainMenuAction, Platform, Office, ServiceItem, Geoposition } from "../store/initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const banksServices: ServiceItem[] = [
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
        name: 'Кредиты',
        subItems: [
            { name: 'Кредит наличными', choosen: false },
            { name: 'Экспресс кредит', choosen: false },
            { name: 'Рефинансирование', choosen: false },
        ],
    },
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
      name: 'Вклады',
      subItems: [{ name: 'Рассчитать кредит', choosen: false }, { name: 'Кредит наличными', choosen: false }],
    },
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
      name: 'Карты',
      subItems: [
        { name: 'Дебетовые карты', choosen: false },
        { name: 'Кредитные карты', choosen: false },
        { name: 'Пенсионные карты', choosen: false },
        { name: 'Карты жителя', choosen: false },
      ],
    },
    
    {clentId: "PF",choosen: false, expanded: false, name: 'Ипотека', subItems: [] },
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
      name: 'Автокредиты',
      subItems: [
        { name: 'Автокредит наличными', choosen: false },
        { name: 'Автокредит в автосалоне', choosen: false },
      ],
    },
    {clentId: "PF", choosen: false, expanded: false, name: 'Вклады и счета', subItems: [] },
    {clentId: "PF", choosen: false, expanded: false, name: 'Инвестиции', subItems: [] },
    {clentId: "PF", choosen: false, expanded: false, name: 'Платежи и переводы', subItems: [{ name: 'Оплата услуг', choosen: false }] },
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
      name: 'Другие услуги',
      subItems: [
        { name: 'Страховые и сервисные продукты', choosen: false },
        { name: 'Аренда сейфовых ячеек', choosen: false },
        { name: 'Банкротство физических лиц', choosen: false },
      ],
    },
    {
      clentId: "PF",
      choosen: false,
        expanded: false,
      name: 'Валюта и золото',
      subItems: [
        { name: 'Купить валюту', choosen: false },
        { name: 'Продать валюту', choosen: false },
        { name: 'Купить золото', choosen: false },
      ],
    },
  ];

const initialState: InitialState = {
  clientGeoposition: {
    latitude: 0,
    longitude: 0
  },
  platform: Platform.DESKTOP,
  search: {},
  filters: {
    opened: false,
    banks: {
        choosed: true,
        filters: [
          {
            id: "PF",
            name: "Физические лица",
            checked: true,
          },
          {
            id: "LF",
            name: "Юридические лица",
            checked: false,
          }
        ],
        services: banksServices
    },
    itms: {
        choosed: false,
        filters: [],
        services: []
    }
  },
  tags: [],
  offices: {
    offices: []
  },
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
            state.filters.banks.services = expandParticularService(state.filters.banks.services, action) 
        } else {
            state.filters.itms.services = expandParticularService(state.filters.banks.services, action)
        }
    },

    switchOption: (state, action: PayloadAction<boolean>) => {
        state.filters.banks.choosed = action.payload
        state.filters.itms.choosed = !action.payload
    },

    loadOffices: (state, action: PayloadAction<(Office | null)[]>) => {
        if (!action.payload.some(item => item === null)) {
            state.offices.offices = action.payload.map(office => ({
                address: office!.address,
                img: office!.img,
                distance: office!.distance
            }))
        }
        
    },

    setClientPosition: (state, action: PayloadAction<Geoposition>) => {
      state.clientGeoposition = action.payload;
    },

    collapseAllFilters: (state) => {
      state.filters.banks.services = state.filters.banks.services.map(service => ({...service, expanded: false}))
    },

    chooseItem: (state, action: PayloadAction<ChooseServiceAction>) => {
      const { itemName, subItemName, isBanks, choosen } = action.payload;
      if (subItemName === undefined) {
        if (isBanks) {
          state.filters.banks.services = state.filters.banks.services.map(setServiceChoosen(itemName, choosen))
        } else {
          state.filters.itms.services = state.filters.itms.services.map(setServiceChoosen(itemName, choosen))
        }
      } else {
        if (isBanks) {
          state.filters.banks.services = state.filters.banks.services.map(setServiceSubItemChoosen(itemName, subItemName!, choosen))
        } else {
          state.filters.itms.services = state.filters.itms.services.map(setServiceSubItemChoosen(itemName, subItemName!, choosen))
        }
      }
    },

    toggleCheckBox: (state, action: PayloadAction<string>) => {
      state.filters.banks.filters = state.filters.banks.filters.map(checkBox => {
        if (checkBox.id === action.payload) {
          checkBox.checked = true;
        } else {
          checkBox.checked = false;
        }

        return {...checkBox};
      })
    }
  },
});
export const { toggleFilters, loadOffices, expandFilter, switchOption, setClientPosition, collapseAllFilters, chooseItem, toggleCheckBox } =
  mainMenuSlice.actions;

export default mainMenuSlice.reducer;

function setServiceChoosen(itemName: string, choosen: boolean) {
  return (service: ServiceItem) => {
    if (service.name === itemName) {
      service.choosen = choosen;
    }
    return { ...service };
  };
}

function setServiceSubItemChoosen(itemName: string, subItemName: string, choosen: boolean) {
  return (service: ServiceItem) => {
    if (service.name == itemName) {
      service.subItems = service.subItems.map(subItem => {
        if (subItem.name === subItemName) {
          subItem.choosen = choosen;
        }
        return {...subItem}
      })
      service.choosen = service.subItems.some(subItem => subItem.choosen)
    }
    return { ...service };
  };
}

function expandParticularService(services: ServiceItem[], action: { payload: ExpandFilterAction; type: string; }) {
    return services.map((service, index) => {
        if (index === action.payload.menuItemKey) {
            return { ...service, expanded: true };
        }
        return { ...service, expanded: false };
    });
}
