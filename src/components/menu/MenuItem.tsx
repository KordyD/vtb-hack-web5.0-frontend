import { createRef, useEffect, useState } from "react";
import { MenuItem } from "./MainMenu";
import "./MainMenu.css"
import { SubItemComponent } from "./SubItem";
import { Observable } from "rxjs/internal/Observable";
import { debounce, throttle } from "lodash"

export type MenuItemProps = MenuItem & {
    id: string,
    openedMenuObservable: Observable<string>
    fireToogleEvent: (id: string) => void
}

export const MenuItemComponent = ({id, openedMenuObservable, name, subItems, fireToogleEvent}: MenuItemProps) => {

    const [ extended, setExtended ] = useState(false);
    const [ top, setTop ] = useState(0);
    const [ left, setLeft ] = useState(0);

    openedMenuObservable.subscribe(openedId => {
        if (id !== openedId) {
            setExtended(false)
        }
    })

    const extend = () => {
        setExtended(true)
        fireToogleEvent(id);
    }

    const itemRef: React.RefObject<HTMLInputElement> = createRef();


    useEffect(() => {
        const itemRect = itemRef.current?.getBoundingClientRect();
        setTop(itemRect?.top || 0)
        setLeft(itemRect?.right || 0)
    })

    const isSubItems = subItems.length > 0;

    const onItemClickHandler = isSubItems ? () => {} : () => {
        console.log("Clicked", id)
    }
    
    return (
        <div ref={itemRef} className="menu_item" onClick={onItemClickHandler} onMouseOver={throttle(extend, 100)} >
            <span>{name} {isSubItems ? (<span>&#8594;</span>) : ""}</span>
            {extended && <div className="sub_menu" style={{position: 'fixed', top: top, left: left, display: isSubItems ? 'inline' : 'none'}}>
                {subItems.map((subItem, key) => (<SubItemComponent key={key} name={subItem.name} />))}
                </div>}
        </div>
    )
}