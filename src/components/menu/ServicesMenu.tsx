import { ServiceItem } from '../../store/initialState';
import './MainMenu.css';
import { ServiceItemComponent } from './ServiceItemComponent';

export type MainMenuProps = {
  menuItems: ServiceItem[];
  isBanks: boolean;
};

export function ServicesMenu({ menuItems, isBanks }: MainMenuProps) {
  return (
    <div className='main_menu'>
      {menuItems.map((item, key) => (
        <ServiceItemComponent
          clentId={item.clentId}
          chosen={item.chosen}
          expanded={item.expanded}
          isBanks={isBanks}
          key={key}
          id={key}
          name={item.name}
          subItems={item.subItems}
        />
      ))}
    </div>
  );
}
