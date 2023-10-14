import { ServiceItem } from "../../store/initialState"
import { ServiceTag } from "./ServicesTag";
import "./MainMenu.css"

interface ChoosenServicesProps {
    services: ServiceItem[],
    isBanks: boolean
}
export const ChoosenServices = ({services, isBanks }: ChoosenServicesProps) => {
    return (<div className="tags_container">
                {services.map((service, key) => 
                ( service.subItems.length > 0 
                    ?
                 service.subItems.filter(subItem => subItem.choosen).map((subItem, key) => 
                 <ServiceTag isBanks={isBanks} itemName={service.name} subItemName={subItem.name} key={key}/>
                 ) :
                <ServiceTag isBanks={isBanks} itemName={service.name} key={key}/>))}
             </div>
    );
}