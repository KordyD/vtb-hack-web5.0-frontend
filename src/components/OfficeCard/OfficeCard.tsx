import styles from './OfficeCard.module.css';

interface OfficeCardProps {
  address: string;
  img: string;
  distance: number;
  id: number;
  handleClick: (id: number) => void;
}

export const OfficeCard = ({
  address,
  img,
  distance,
  handleClick,
  id,
}: OfficeCardProps) => {
  return (
    <li>
      <button className={styles.officeCard} onClick={() => handleClick(id)}>
        <img className={styles.icon} width={65} src={img} alt='Office icon' />
        <div className={styles.wrapper}>
          <p>{address}</p>
          <p>{distance}</p>
        </div>
      </button>
    </li>
  );
};
