import { Geoposition } from '../../store/initialState';
import styles from './OfficeCard.module.css';

interface OfficeCardProps {
  address: string;
  img: string;
  distance?: number;
  id: number;
  geo: Geoposition;
  lat: number;
  lng: number;
  handleClick: (id: number) => void;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371; // Earth's radius in kilometers (mean value)

  // Convert latitude and longitude from degrees to radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  // Convert latitudes to radians
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance (in kilometers)
  const distance = earthRadius * c;

  return Math.round(distance * 100) / 100;
}

export const OfficeCard = ({
  address,
  img,
  handleClick,
  id,
  geo,
  lat,
  lng,
}: OfficeCardProps) => {
  return (
    <li>
      <button className={styles.officeCard} onClick={() => handleClick(id)}>
        <img className={styles.icon} width={65} src={img} alt='Office icon' />
        <div className={styles.wrapper}>
          <p>{address}</p>
          <p>{haversineDistance(geo.latitude, geo.longitude, lat, lng)}</p>
        </div>
      </button>
    </li>
  );
};
