import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './Filters.module.css';
import { FiltersState } from '../../store/initialState';
import { useDispatch } from 'react-redux';
import { switchOption, toggleFilters } from '../../slice/slice';
import { ServicesMenu } from '../menu/ServicesMenu';

export const Filters = () => {
  const state: FiltersState = useSelector(
    (state: RootState) => state.mainSlice.filters
  );

  const chosenServices = getChosenServices(state);
  const dispatch = useDispatch();
  const switchOptionHandler = (isBanksOption: boolean) => {
    if (isBanks(state) === isBanksOption) {
      return;
    } else {
      dispatch(switchOption(isBanksOption));
    }
  };
  return (
    <>
      <div
        className={styles.filterCard}
        onClick={() => dispatch(toggleFilters())}
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
          <ServicesMenu isBanks={isBanks(state)} menuItems={chosenServices} />
        </>
      )}
    </>
  );
};

const getChosenServices = (state: FiltersState) => {
  if (state.banks.chosen) {
    return state.banks.services;
  } else {
    return state.itms.services;
  }
};

const isBanks = (state: FiltersState) => state.banks.chosen;
