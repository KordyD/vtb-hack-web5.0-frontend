import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import {
  FiltersState,
  Geoposition,
  Office,
  TipItem,
} from '../store/initialState';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import {
  collapseAllFilters,
  getOfficesAsync,
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
  const tips: TipItem[] = useSelector(
    (state: RootState) => state.mainSlice.inputTips
  );

  const state: FiltersState = useSelector(
    (state: RootState) => state.mainSlice.filters
  );

  const clientGeoposition: Geoposition = useSelector(
    (state: RootState) => state.mainSlice.clientGeoposition
  );

  const dispatch = useDispatch<AppDispatch>();

  const menuWindow: React.RefObject<HTMLInputElement> = createRef();

  const chosenServices = getChosenServices(state);

  const loading = useSelector((state: RootState) => state.mainSlice.loading);

  const [menu, setMenu] = useState(false);

  const requestOffices = () => {
    console.log(chosenServices, clientGeoposition);
    dispatch(
      getOfficesAsync({
        servicesIds: chosenServices!.map((service) => service.serviceId),
        limit: 15,
        latitude: clientGeoposition.latitude,
        longitude: clientGeoposition.longitude,
      })
    );
  };

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
        {loading.loadingServices ? <h2>Loading...</h2> : <Filters />}

        {chosenServices && chosenServices.length > 0 && (
          <ChosenServices isBanks={isBanks(state)} services={chosenServices} />
        )}
        <button
          onClick={() => requestOffices()}
          style={{
            fontFamily: 'inherit',
            padding: '10px',
            backgroundColor: 'white',
            borderColor: 'rgb(13, 105, 242)',
            borderStyle: 'solid',
            borderWidth: '1px',
            cursor: 'pointer',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        >
          request offices
        </button>
        {loading.loadingOffices ? <h2>Loading...</h2> : <OfficeCardsMenu />}
      </div>
    </>
  );
};
