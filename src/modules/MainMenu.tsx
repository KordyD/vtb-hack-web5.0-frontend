import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import { Office } from '../store/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { toggleFilters } from '../slice/slice';
import { Filters } from '../components/filters/FiltersComponent';


export const MainMenu = () => {
  const offices: Office[] = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  )
  const dispatch = useDispatch();
  return (
    <div className={styles.mainMenu}>
      <input />
      <Filters />
      <ul className={styles.list}>
        {offices.map((item, index) => (
          <OfficeCard
            img={icon}
            address={item.address}
            key={index}
            distance={item.distance}
          />
        ))}
      </ul>
    </div>
  );
};
