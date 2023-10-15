import { useDispatch } from 'react-redux';
import styles from './MainMenu.module.css';
import { chooseItem, setTips } from '../slice/slice';

interface TipProps {
  itemName: string;
  isBanks: boolean;
  subItemName?: string;
}

export const Tip = ({ itemName, subItemName, isBanks }: TipProps) => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.tip}
      onClick={() => {
        dispatch(chooseItem({ isBanks, itemName, subItemName, chosen: true }));
        dispatch(setTips([]));
      }}
    >
      {subItemName ? subItemName : itemName}
    </div>
  );
};
