import styles from './OfficeCard.module.css';

interface OfficeCardProps {
  address: string;
  img: string;
  distance: number;
}

export const OfficeCard = ({ address, img, distance }: OfficeCardProps) => {
  return (
    <li className={styles.officeCard}>
      <img className={styles.icon} width={65} src={img} alt='Office icon' />
      <p>{address}</p>
      <p>{distance}</p>
    </li>
  );
};
