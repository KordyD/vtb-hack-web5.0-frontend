import { useDispatch } from "react-redux";
import { FilterItem } from "../../store/initialState";
import styles from './Filters.module.css';
import { collapseAllFilters, toggleCheckBox } from "../../slice/slice";

export interface CheckBoxProps {
    checkBoxes: FilterItem[]
}

export const CheckBoxFilters = ({ checkBoxes }: CheckBoxProps) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.checkBoxesContainer}>
            {checkBoxes.map(({name, checked, id}, key) => (
            <div className={styles.inputWrapper} key={key}>
                <label className={styles.label} htmlFor={id}>{name}</label>
                <input onClick={() => {
                        dispatch(toggleCheckBox(id));
                        dispatch(collapseAllFilters());
                    }
                } className={styles.input} type="radio" id={id} name={name} checked={checked} />
            </div>))}
        </div>
    );
}