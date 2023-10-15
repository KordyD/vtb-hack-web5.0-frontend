import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import { FiltersState, Office, TipItem } from '../store/initialState';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import {
  collapseAllFilters,
  getServicesAsync,
  setMainInput,
  setTips,
} from '../slice/slice';
import { Filters } from '../components/filters/FiltersComponent';
import { createRef, useEffect, useState } from 'react';
import { OfficeCardsMenu } from '../components/OfficeCardsMenu/OfficeCardsMenu';
import { MainInput } from './MainInput';
import { InputTips } from './InputTips';
import { ChosenServices } from '../components/menu/ChoosenServices';
import {
  getChosenServices,
  isBanks,
} from '../components/helpers/GettersFunctions';

export const MainMenu = () => {
  const offices: Office[] = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  );

  const tips: TipItem[] = useSelector(
    (state: RootState) => state.mainSlice.inputTips
  );

  const state: FiltersState = useSelector(
    (state: RootState) => state.mainSlice.filters
  );

  const dispatch = useDispatch<AppDispatch>();

  const menuWindow: React.RefObject<HTMLInputElement> = createRef();

  const chosenServices = getChosenServices(state);

  const [menu, setMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenu(true)}
        className={`${styles.menuButton} ${
          menu ? '' : styles.activeMenuButton
        }`}
      >
        &#x2714;
      </button>
      <div
        ref={menuWindow}
        className={`${styles.mainMenu} ${menu ? styles.active : ''}`}
        onClick={(event) => {
          if (event.target === menuWindow.current) {
            dispatch(collapseAllFilters());
            dispatch(setTips([]));
            dispatch(setMainInput(''));
          }
        }}
      >
        <div className={styles.wrapper}>
          <MainInput />
          <button className={styles.crossButton} onClick={() => setMenu(false)}>
            &#x2716;
          </button>
        </div>
        {tips.length > 0 && <InputTips inputTips={tips} />}
        <Filters />
        {chosenServices && chosenServices.length > 0 && (
          <ChosenServices isBanks={isBanks(state)} services={chosenServices} />
        )}
        <OfficeCardsMenu />
      </div>
    </>
  );
};
