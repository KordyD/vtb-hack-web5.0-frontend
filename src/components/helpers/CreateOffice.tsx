import { LatLng } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setDistances } from '../../slice/slice';
import { useEffect } from 'react';

export const CreateOffice = ({
  coord1,
  coord2,
  id,
}: {
  coord1: LatLng;
  coord2: LatLng;
  id: number;
}) => {
  const dispatch = useDispatch();

  const map = useMap();

  const distance: number = Math.round(map.distance(coord1, coord2)) / 1000;

  useEffect(() => {
    dispatch(setDistances({ id, distance }));
  });

  return null;
};
