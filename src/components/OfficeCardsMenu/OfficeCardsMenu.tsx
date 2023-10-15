import styles from './OfficeCardsMenu.module.css';
import { OfficeCard } from '../OfficeCard/OfficeCard';
import icon from '/VTB-map-icon.svg';
import { Office } from '../../store/initialState';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { chooseOffice } from '../../slice/slice';

export const OfficeCardsMenu = () => {
  const dispatch = useDispatch();

  const offices: Office[] = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  );
  const getOfficeMark = (id: number) => {
    dispatch(chooseOffice(id));
  };

  return (
    <ul className={styles.list}>
      {offices.map((item) => (
        <OfficeCard
          img={icon}
          address={item.address}
          key={item.id}
          id={item.id}
          distance={item.distance}
          handleClick={getOfficeMark}
        />
      ))}
    </ul>
  );
};
