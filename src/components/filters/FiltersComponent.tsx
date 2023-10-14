import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import styles from './Filters.module.css';
import { FiltersState } from "../../store/initialState"
import { useDispatch } from "react-redux";
import { collapseAllFilters, switchOption, toggleFilters } from "../../slice/slice";
import { ServicesMenu } from "../menu/ServicesMenu";
import { CheckBoxFilters } from "./CheckBoxFilters";
import { ChoosenServices } from "../menu/ChoosenServices";

export const Filters = () => {
    const state: FiltersState = useSelector(
        (state: RootState) => state.mainSlice.filters
    );

    const dispatch = useDispatch();

    const visibleServices = getVisibleServices(state);
    const choosedServices = getChoosedServices(state);
    
    const switchOptionHandler = (isBanksOption: boolean) => {
        if (isBanks(state) === isBanksOption) {
            return;
        } else {
            dispatch(switchOption(isBanksOption))
        }
    } 

    const checkBoxes = getCheckBoxes(state);

    return (
        <>
            <div className={styles.filterCard} onClick={() => {
                dispatch(toggleFilters());
                dispatch(collapseAllFilters());
            }}>Фильтры {state.opened ? <span>&#9661;</span> : <span>&#9655;</span>}</div>
            {state.opened && 
            (<>
                <div style={{marginTop: '2em'}}>
                    <span className={isBanks(state) ? styles.optionCardChoosed :  styles.optionCard} onClick={() => switchOptionHandler(true)}>Отделения</span>
                    <span className={!isBanks(state) ? styles.optionCardChoosed : styles.optionCard} onClick={() => switchOptionHandler(false)}>Банкоматы</span>
                </div>
                <hr className={styles.hr}/>
                {checkBoxes.length > 0 && <>
                    <CheckBoxFilters checkBoxes={checkBoxes}/>
                    <hr className={styles.hr}/>
                </> }
                
                {visibleServices.length > 0 && <ServicesMenu isBanks={isBanks(state)} menuItems={visibleServices} />}
                {choosedServices && choosedServices.length > 0 && <ChoosenServices isBanks={isBanks(state)} services={choosedServices} />}
            </>)}
        </>
    )
}

const getVisibleServices = (state: FiltersState) => {
    if (state.banks.choosed) {
        return state.banks.services.filter(service => service.clentId === getChoosedCheckBox(state))
    } else {
        return state.itms.services
    }
} 

const getChoosedServices = (state: FiltersState) => {
    if (isBanks(state)) {
        return state.banks.services.filter(service => service.choosen)
    }
}

const getChoosedCheckBox = (state: FiltersState) => state.banks.filters.find(filter => filter.checked)?.id


const getCheckBoxes = (state: FiltersState) => {
    if (isBanks(state)) {
        return state.banks.filters;
    }

    return []
}

const isBanks = (state: FiltersState) => state.banks.choosed;