import { useMap } from 'react-leaflet';
import { Office } from '../../store/initialState';
import { latLng } from 'leaflet';

export const CenterMapOnPoint = ({
  coords,
  chosenOffice,
  officeData,
}: {
  coords: number[];
  chosenOffice: number | null;
  officeData: Office[];
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
  map.setView(latLng(viewCoords[0], viewCoords[1]), 18);
  return null;
};
