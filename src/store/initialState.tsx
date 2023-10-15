export interface InitialState {
  mainInputValue: string;
  inputTips: TipItem[];
  clientGeoposition: Geoposition;
  platform: Platform;
  search: SearchState;
  filters: FiltersState;
  tags: TagState;
  offices: OfficesState;
  chosenOffice: number | null;
  loading: {
    loadingServices: boolean;
    loadingOffices: boolean;
  };
}

export interface Geoposition {
  latitude: number;
  longitude: number;
}

export enum Platform {
  DESKTOP,
  MOBILE,
}

export interface OfficesState {
  offices: Office[];
}

export interface Service {
  serviceId: number;
  serviceName: string;
}

export interface Office {
  id: number;
  salePointName: string;
  address: string;
  latitude: number;
  longitude: number;
  status: boolean;
  officeType: string;
  metroStation: string;
  services: [Service];
  charts: [
    {
      weeksDay: string;
      chartByTime: number[];
    }
  ];
  worksTime: [
    {
      weeksDay: string;
      workTimeStart: string;
      workTimeEnd: string;
      isLegal: boolean;
    }
  ];
  img?: string;
  distance?: number;
}

export interface TagState {}

export interface SearchState {}

export interface FiltersState {
  opened: boolean;
  banks: Filter;
  itms: Filter;
}

export interface SubItem {
  chosen: boolean;
  name: string;
}

export type FilterItem = {
  name: string;
  checked: boolean;
  id: string;
};

export interface TipItem {
  itemName: string;
  isBanks: boolean;
  subItemName?: string;
}

export type ServiceItem = {
  name: string;
  expanded: boolean;
  subItems: SubItem[];
  chosen: boolean;
  clentId: string;
  serviceId: number;
};

export interface Filter {
  chosen: boolean;
  filters: FilterItem[];
  services: ServiceItem[];
}

export const MainMenuAction: string = 'MainMenu';
