export interface InitialState {
    platform: Platform,
    search: SearchState,
    filters: FiltersState,
    tags: TagState,
    offices: OfficesState,
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
    name: string,
}

export type FilterItem = {
    
}


export type ServiceItem = {
    name: string,
    expanded: boolean,
    subItems: SubItem[]
}

export interface Filter {
    choosed: boolean,
    filters: FilterItem[],
    services: ServiceItem[],
}



export const MainMenuAction: string = "MainMenu";
