export interface InitialState {
    clientGeoposition: Geoposition,
    platform: Platform,
    search: SearchState,
    filters: FiltersState,
    tags: TagState,
    offices: OfficesState,
}

export interface Geoposition {
    latitude: number,
    longitude: number
}

export enum Platform {
    DESKTOP,
    MOBILE
}

export interface OfficesState {
    offices: Office[]
}

export interface Office {
    address: string;
    img: string;
    distance: number;
  }

export interface TagState {

}


export interface SearchState {

}

export interface FiltersState {
    opened: boolean,
    banks: Filter,
    itms: Filter,
}

export interface SubItem {
    choosen: boolean,
    name: string,
}

export type FilterItem = {
    name: string,
    checked: boolean,
    id: string,
}


export type ServiceItem = {
    name: string,
    expanded: boolean,
    subItems: SubItem[],
    choosen: boolean,
    clentId: string,
}

export interface Filter {
    choosed: boolean,
    filters: FilterItem[],
    services: ServiceItem[],
}



export const MainMenuAction: string = "MainMenu";
