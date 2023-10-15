import { TipItem } from '../store/initialState';
import styles from './MainMenu.module.css';
import { Tip } from './Tip';

interface InputTipsProps {
  inputTips: TipItem[];
}

export const InputTips = ({ inputTips }: InputTipsProps) => {
  return (
    <div className={styles.tips}>
      {inputTips.map((inputTip, key) => (
        <Tip
          key={key}
          itemName={inputTip.itemName}
          subItemName={inputTip.subItemName}
          isBanks={inputTip.isBanks}
        />
      ))}
    </div>
  );
};
