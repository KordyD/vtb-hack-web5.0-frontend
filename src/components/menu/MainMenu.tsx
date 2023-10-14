import './MainMenu.css'
import { MenuItemComponent } from './MenuItem'
import { Subject } from 'rxjs'

export type SubItem = {
    name: string,
}

export type MenuItem = {
    name: string,
    subItems: SubItem[]
}

export type MainMenuProps = {
    menuItems: MenuItem[]
}


export function MainMenu ({ menuItems }: MainMenuProps) {
    const toggleSubject = new Subject<string>();

    const fireToogleEvent = (id: string) => {
        toggleSubject.next(id);
    }
    return (
        <div className="main_menu">
            { menuItems.map((item, key) => (<MenuItemComponent key={key} id={key.toString()} openedMenuObservable={toggleSubject.asObservable()} fireToogleEvent={fireToogleEvent} name={item.name} subItems={item.subItems}/>)) }
        </div>
    )
}