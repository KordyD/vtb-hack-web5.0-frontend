import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Filters.module.css';
import { FiltersState } from '../../store/initialState';
import { useDispatch } from 'react-redux';
import {
  collapseAllFilters,
  getServicesAsync,
  switchOption,
  toggleFilters,
} from '../../slice/slice';
import { ServicesMenu } from '../menu/ServicesMenu';
import { CheckBoxFilters } from './CheckBoxFilters';
import { ChosenServices } from '../menu/ChoosenServices';
import {
  getCheckBoxes,
  getChosenServices,
  getVisibleServices,
  isBanks,
} from '../helpers/GettersFunctions';

export const Filters = () => {
  const state: FiltersState = useSelector(
    (state: RootState) => state.mainSlice.filters
  );

  const dispatch = useDispatch<AppDispatch>();
  const visibleServices = getVisibleServices(state);
  const chosenServices = getChosenServices(state);

  const switchOptionHandler = (isBanksOption: boolean) => {
    if (isBanks(state) === isBanksOption) {
      return;
    } else {
      dispatch(switchOption(isBanksOption));
    }
  };

  const checkBoxes = getCheckBoxes(state);

  return (
    <>
      <div
        className={styles.filterCard}
        onClick={() => {
          dispatch(toggleFilters());
          dispatch(collapseAllFilters());
        }}
      >
        Фильтры {state.opened ? <span>&#9661;</span> : <span>&#9655;</span>}
      </div>
      {state.opened && (
        <>
          <div style={{ marginTop: '2em' }}>
            <span
              className={
                isBanks(state) ? styles.optionCardChosen : styles.optionCard
              }
              onClick={() => switchOptionHandler(true)}
            >
              Отделения
            </span>
            <span
              className={
                !isBanks(state) ? styles.optionCardChosen : styles.optionCard
              }
              onClick={() => switchOptionHandler(false)}
            >
              Банкоматы
            </span>
          </div>
          <hr className={styles.hr} />
          {checkBoxes.length > 0 && (
            <>
              <CheckBoxFilters checkBoxes={checkBoxes} />
              <hr className={styles.hr} />
            </>
          )}

          {visibleServices.length > 0 && (
            <ServicesMenu
              isBanks={isBanks(state)}
              menuItems={visibleServices}
            />
          )}
        </>
      )}
    </>
  );
};
