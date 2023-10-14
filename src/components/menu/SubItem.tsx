import { SubItem } from "./MainMenu";
import "./MainMenu.css"

export const SubItemComponent = ({name}: SubItem) => {

    return (
        <div className="menu_sub_item">
            {name}
        </div>
    )
}