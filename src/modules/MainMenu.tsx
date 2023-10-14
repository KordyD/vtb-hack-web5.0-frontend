import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard';
import data from '../utils/offices.json';
import { Data } from './Router';
import icon from '/VTB-map-icon.svg';

interface MainMenuProps {
  distances: number[];
}

const offices = data as Data[];

export const MainMenu = ({ distances }: MainMenuProps) => {
  return (
    <div className={styles.mainMenu}>
      <input />
      <button>Фильтры</button>
      <ul className={styles.list}>
        {offices.map((item, index) => (
          <OfficeCard
            img={icon}
            address={item.address}
            key={index}
            distance={distances[index]}
          />
        ))}
      </ul>
    </div>
  );
};
