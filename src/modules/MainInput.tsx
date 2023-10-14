import { debounce } from 'lodash';
import styles from './MainMenu.module.css'
import { useDispatch } from 'react-redux';
import { setMainInput, setTips } from '../slice/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const MainInput = () => {

    const dispatch = useDispatch();

    const value: string = useSelector(
        (state: RootState) => state.mainSlice.mainInputValue
    )

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(setMainInput(value));
        dispatch(setTips([{itemName: "Кредиты", subItemName: "Кредит наличными", isBanks:true}, {itemName: "Кредиты", subItemName: "Экспресс кредит", isBanks: true}]))
    };

    const debouncedInputChange = debounce(handleInputChange, 500)

    return <input  onInput={debouncedInputChange} className={styles.input} placeholder='Введите название услуги' />
}
    
