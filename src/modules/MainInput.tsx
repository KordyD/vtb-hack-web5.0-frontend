import { debounce } from 'lodash';
import styles from './MainMenu.module.css';
import { useDispatch } from 'react-redux';
import { setMainInput, setTips } from '../slice/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ServiceItem, TipItem } from '../store/initialState';

export const MainInput = () => {
  const dispatch = useDispatch();

  const value: string = useSelector(
    (state: RootState) => state.mainSlice.mainInputValue
  );

  const services: ServiceItem[] = useSelector(
    (state: RootState) => state.mainSlice.filters.banks.services
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setMainInput(value));
    if (
      services.find((service) =>
        service.name.toLowerCase().includes(value.toLowerCase())
      )
    ) {
      dispatch(
        setTips(
          services
            .filter((service) =>
              service.name.toLowerCase().includes(value.toLowerCase())
            )
            .map((service) => {
              const tip: TipItem = { itemName: service.name, isBanks: true };
              return tip;
            })

          // { itemName: 'Кредиты', isBanks: true },
          // {
          //   itemName: 'Кредиты',
          //   subItemName: 'Экспресс кредит',
          //   isBanks: true,
          // },
        )
      );
    }
  };

  const debouncedInputChange = debounce(handleInputChange, 500);

  return (
    <input
      onInput={debouncedInputChange}
      className={styles.input}
      placeholder='Введите название услуги'
    />
  );
};
