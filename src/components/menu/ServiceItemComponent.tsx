import { createRef, useEffect, useState } from "react";
import "./MainMenu.css"
import { SubItemComponent } from "./SubItem";
import { ServiceItem } from "../../store/initialState";
import { useDispatch } from "react-redux";
import { chooseItem, expandFilter } from "../../slice/slice";

export type MenuItemProps = ServiceItem & {
    id: number,
    isBanks: boolean,
}

export const ServiceItemComponent = ({id, isBanks, expanded, name, subItems, choosen }: MenuItemProps) => {

    const [ top, setTop ] = useState(0);
    const [ left, setLeft ] = useState(0);
    const dispatch = useDispatch();

    const extend = () => {
        dispatch(expandFilter({isBanks, menuItemKey: id}))
    }

    const itemRef: React.RefObject<HTMLInputElement> = createRef();


    useEffect(() => {
        const itemRect = itemRef.current?.getBoundingClientRect();
        setTop(itemRect?.top || 0)
        setLeft(itemRect?.right || 0)
    })

    const isSubItems = subItems.length > 0;

    const onItemClickHandler = isSubItems ? extend : () => {
        dispatch(chooseItem({itemName: name, isBanks, choosen: !choosen}))
    }
    
    return (
        <div ref={itemRef} className={choosen ? "menu_item_choosen" : "menu_item"} onClick={onItemClickHandler} >
            <span>{name}</span>
            {isSubItems ? (<span style={{float: 'right'}}>&#8594;</span>) : ""}
            {expanded && <div className="sub_menu" style={{position: 'fixed', top: top, left: left, display: isSubItems ? 'inline' : 'none'}}>
                {subItems.map((subItem, key) => (<SubItemComponent isBanks={isBanks} choosen={subItem.choosen} itemName={name}  key={key} name={subItem.name} />))}
                </div>}
        </div>
    )
}
