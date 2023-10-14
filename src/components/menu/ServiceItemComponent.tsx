import { createRef, useEffect, useState } from "react";
import "./MainMenu.css"
import { SubItemComponent } from "./SubItem";
import { throttle } from "lodash"
import { ServiceItem } from "../../store/initialState";
import { useDispatch } from "react-redux";
import { expandFilter } from "../../slice/slice";

export type MenuItemProps = ServiceItem & {
    id: number,
    isBanks: boolean,
}

export const ServiceItemComponent = ({id, isBanks, expanded, name, subItems }: MenuItemProps) => {

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
        console.log("Clicked", id)
    }
    
    return (
        <div ref={itemRef} className="menu_item" onClick={onItemClickHandler} >
            <span>{name}</span>
            {isSubItems ? (<span>&#8594;</span>) : ""}
            {expanded && <div className="sub_menu" style={{position: 'fixed', top: top, left: left, display: isSubItems ? 'inline' : 'none'}}>
                {subItems.map((subItem, key) => (<SubItemComponent key={key} name={subItem.name} />))}
                </div>}
        </div>
    )
}
