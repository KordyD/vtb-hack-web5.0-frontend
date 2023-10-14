import styles from './MainMenu.module.css';
import { OfficeCard } from '../components/OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import { Office, TipItem } from '../store/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { collapseAllFilters, setMainInput, setTips } from '../slice/slice';
import { Filters } from '../components/filters/FiltersComponent';
import { createRef } from 'react';
import { OfficeCardsMenu } from '../components/OfficeCardsMenu/OfficeCardsMenu';
import { MainInput } from './MainInput';
import { InputTips } from './InputTips';

export const MainMenu = () => {
  const offices: Office[] = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  );

  const tips: TipItem[] = useSelector(
    (state: RootState) => state.mainSlice.inputTips
  )

  const dispatch = useDispatch();

  const menuWindow: React.RefObject<HTMLInputElement> = createRef();

  return (
    <div
      ref={menuWindow}
      className={styles.mainMenu}
      onClick={(event) => {
        if (event.target === menuWindow.current) {
          dispatch(collapseAllFilters());
          dispatch(setTips([]))
          dispatch(setMainInput(""))
        }
      }}
    >
      <MainInput />
      {tips.length > 0 && <InputTips inputTips={tips} />}
      <Filters />
      <OfficeCardsMenu />
    </div>
  );
};
