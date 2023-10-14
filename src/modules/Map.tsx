import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import data from '../utils/offices.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { icon } from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { Data } from './Router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import iconVtb from '/VTB-map-icon.svg';
import { loadOffices } from '../slice/slice';
import { createCustomIcon } from '../utils/createCustomIcon';
import { CenterMapOnPoint } from '../components/helpers/CenterMapOnPoint';
import { CreateOffice } from '../components/helpers/CreateOffice';

const officeData = data as Data[];
const markerIcon = icon({
  iconUrl: '/VTB-map-icon.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 69],
});

export const Map = () => {
  const offices = useSelector(
    (state: RootState) => state.mainSlice.offices.offices
  );

  const chosenOffice = useSelector(
    (state: RootState) => state.mainSlice.chosenOffice
  );

  const dispatch = useDispatch();

  const [coords, setCoords] = useState<number[]>([55.7522, 37.6156]);

  useEffect(() => {
    dispatch(
      loadOffices(
        officeData.map((item, index) => ({
          address: item!.address,
          img: iconVtb,
          distance: item!.distance,
          id: index,
        }))
      )
    );
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoords([latitude, longitude]);
      },
      (error) => {
        setCoords([55.7522, 37.6156]);
      }
    );
  }, []);

  return (
    <>
      <MapContainer
        style={{ height: '100vh', zIndex: '0' }}
        center={[coords[0], coords[1]]}
        zoom={9}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ZoomControl position='bottomright' />
        <Marker position={[coords[0], coords[1]]} />
        <MarkerClusterGroup
          iconCreateFunction={createCustomIcon}
          showCoverageOnHover={false}
          chunkedLoading
        >
          {officeData.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={markerIcon}
            >
              <CenterMapOnPoint
                chosenOffice={chosenOffice}
                coords={coords}
                officeData={officeData}
              />
              <CreateOffice
                coord1={[item.latitude, item.longitude]}
                coord2={[coords[0], coords[1]]}
                id={index}
              />
              <Popup>{index}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* <RouterComponent data={offices} /> */}
      </MapContainer>
    </>
  );
};
