import { useMap } from 'react-leaflet';
import { Data } from '../../modules/Router';

export const CenterMapOnPoint = ({
  coords,
  chosenOffice,
  officeData,
}: {
  coords: number[];
  chosenOffice: number | null;
  officeData: Data[];
}) => {
  let viewCoords = [];
  if (chosenOffice === null) {
    viewCoords = [...coords];
  } else {
    viewCoords = [
      officeData[chosenOffice!].latitude,
      officeData[chosenOffice!].longitude,
    ];
  }
  const map = useMap();
  map.setView(viewCoords, 13);
  return null;
};
