import { useDispatch } from 'react-redux';
import { SubItem } from '../../store/initialState';
import './MainMenu.css';
import { chooseItem } from '../../slice/slice';

interface SubItemProps extends SubItem {
  itemName: string;
  isBanks: boolean;
}

export const SubItemComponent = ({
  name,
  chosen,
  itemName,
  isBanks,
}: SubItemProps) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(
          chooseItem({
            itemName,
            subItemName: name,
            isBanks: isBanks,
            chosen: !chosen,
          })
        );
      }}
      className={chosen ? 'menu_item_chosen' : 'menu_item'}
    >
      {name}
    </div>
  );
};
