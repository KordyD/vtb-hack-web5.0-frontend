import { useDispatch } from 'react-redux';
import './MainMenu.css';
import { chooseItem } from '../../slice/slice';

interface ServiceTagProps {
  itemName: string;
  isBanks: boolean;
  subItemName?: string;
}

export const ServiceTag = ({
  itemName,
  subItemName,
  isBanks,
}: ServiceTagProps) => {
  const dispatch = useDispatch();
  return (
    <div className='service_tag'>
      {subItemName ? subItemName : itemName}{' '}
      <span
        onClick={() =>
          dispatch(
            chooseItem({ isBanks, itemName, subItemName, chosen: false })
          )
        }
        className='tag_close_icon'
      >
        &#10005;
      </span>
    </div>
  );
};
