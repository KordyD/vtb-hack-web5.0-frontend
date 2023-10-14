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
import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import iconVtb from '/VTB-map-icon.svg';
import { loadOffices, setClientPosition } from '../slice/slice';
import { Geoposition, Office } from "../store/initialState"
import { debounce, throttle } from 'lodash';
import { Subject } from 'rxjs';
import { createCustomIcon } from '../utils/createCustomIcon';
import { CenterMapOnPoint } from '../components/helpers/CenterMapOnPoint';
import { CreateOffice } from '../components/helpers/CreateOffice';


const officeData = data as Data[];
const markerIcon = icon({
  iconUrl: '/VTB-map-icon.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 69],
});

const locationSubject: Subject<number[]> = new Subject<number[]>();

navigator.geolocation.watchPosition(
  (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("new position")
    locationSubject.next([latitude, longitude])
  },
  (error) => {
    locationSubject.next([55.7522, 37.6156])
  },
);

// TODO: Подключить Redux. Отрисовывать объекты в списке только в рамках карты.
// FIXME: Причесать код ниже, выглядит плохо
// Краткая задача кода ниже: брать геолокацию юзера и писать дистанцию от отделений до него

export const Map = () => {
  const mapRef = useRef(null);

  const coords: Geoposition = useSelector(
    (state: RootState) => state.mainSlice.clientGeoposition
  )

  const dispatch = useDispatch()

  const chosenOffice = useSelector(
    (state: RootState) => state.mainSlice.chosenOffice
  );  

  useEffect(() => {
    locationSubject.subscribe(([latitude, longitude]) => {
      dispatch(setClientPosition({latitude, longitude}))
      dispatch(loadOffices(officeData.map((item, index) => ({
          address: item!.address,
          img: iconVtb,
          distance: item!.distance,
          id: index,
        }))));
    })
  })


  

  return (
    <>
      <MapContainer
        style={{ height: '100vh', zIndex: '0' }}
        center={[coords.latitude, coords.longitude]}
        zoom={9}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ZoomControl position='bottomright' />
        <Marker position={[coords.latitude, coords.longitude]} />
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
                coords={[coords.latitude, coords.longitude]}
                officeData={officeData}
              />
              <CreateOffice
                coord1={[item.latitude, item.longitude]}
                coord2={[coords.latitude, coords.longitude]}
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
