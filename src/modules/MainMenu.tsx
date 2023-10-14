import styles from './MainMenu.module.css';
import { Filters } from '../components/filters/FiltersComponent';
import { OfficeCardsMenu } from '../components/OfficeCardsMenu/OfficeCardsMenu';

export const MainMenu = () => {
  return (
    <div className={styles.mainMenu}>
      <input />
      <Filters />
      <OfficeCardsMenu />
    </div>
  );
};
