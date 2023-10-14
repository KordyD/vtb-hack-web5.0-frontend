import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import { Office } from '../store/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { collapseAllFilters } from '../slice/slice';
import { Filters } from '../components/filters/FiltersComponent';
import { createRef } from 'react';


export const MainMenu = () => {

  const offices: Office[] = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  )

  const dispatch = useDispatch();

  const menuWindow: React.RefObject<HTMLInputElement> = createRef()

  return (
    <div ref={menuWindow} className={styles.mainMenu} onClick={(event) => {
      if (event.target === menuWindow.current) {
        dispatch(collapseAllFilters())
      }
    }}>
      <input />
      <Filters />
      <OfficeCardsMenu />
    </div>
  );
};
