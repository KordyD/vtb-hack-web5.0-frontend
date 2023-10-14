import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import data from '../utils/offices.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Control, icon } from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { Data } from './Router';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import iconVtb from '/VTB-map-icon.svg';
import { loadOffices, setClientPosition, setDistances } from '../slice/slice';
import { Geoposition, Office } from '../store/initialState';
import { createCustomIcon } from '../utils/createCustomIcon';
import { CenterMapOnPoint } from '../components/helpers/CenterMapOnPoint';
// import { CreateOffice } from '../components/helpers/CreateOffice';
import { LatLng } from 'leaflet';
import { Routing } from 'leaflet';
import './Map.css';

const officeData = data as Data[];
const markerIcon = icon({
  iconUrl: '/VTB-map-icon.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 69],
});

// TODO: Подключить Redux. Отрисовывать объекты в списке только в рамках карты.
// FIXME: Причесать код ниже, выглядит плохо
// Краткая задача кода ниже: брать геолокацию юзера и писать дистанцию от отделений до него

export const Map = () => {
  const mapRef = useRef(null);

  const [routing, setRouting] = useState<Control | null>();

  const routerHandler = (departure: number[], destination: number[]) => {
    const map = mapRef.current;
    if (!map) {
      return null;
    }
    if (routing) {
      routing.remove();
    }
    const route = Routing.control({
      waypoints: [
        latLng(departure[0], departure[1]),
        latLng(destination[0], destination[1]),
      ],
      createMarker: function () {
        return null;
      },
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      router: Routing.graphHopper('674c54dd-0cec-4e17-a404-31c248a4bdf8'),
    });
    setRouting(route);
    route.addTo(map);
  };

  const coords: Geoposition = useSelector(
    (state: RootState) => state.mainSlice.clientGeoposition
  );

  const dispatch = useDispatch();

  const chosenOffice = useSelector(
    (state: RootState) => state.mainSlice.chosenOffice
  );

  const latLng = (latitude: number, longitude: number) => {
    return new LatLng(latitude, longitude);
  };

  const createOffice = (id: number, coord1: LatLng, item: Data) => {
    const map = mapRef.current;
    if (!map) {
      return null;
    }
    const distance: number = map.distance(
      coord1,
      latLng(item.latitude, item.longitude)
    );

    const office: Office = {
      address: item.address,
      img: iconVtb,
      distance: distance,
      id,
    };

    return office;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setClientPosition({ latitude, longitude }));
        dispatch(
          loadOffices(
            officeData.map((item, index) =>
              createOffice(index, latLng(latitude, longitude), item)
            )
          )
        );
      },
      (error) => {
        dispatch(setClientPosition({ latitude: 55.7522, longitude: 37.6156 }));
        dispatch(
          loadOffices(
            officeData.map((item, index) =>
              createOffice(
                index,
                latLng(coords.latitude, coords.longitude),
                item
              )
            )
          )
        );
      }
    );
  });

  return (
    <>
      <MapContainer
        style={{ height: '100vh', zIndex: '0' }}
        center={[coords.latitude, coords.longitude]}
        zoom={9}
        zoomControl={false}
        ref={mapRef}
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
              <Popup>
                <button
                  className='popup-routing-button'
                  onClick={() =>
                    routerHandler(
                      [coords.latitude, coords.longitude],
                      [item.latitude, item.longitude]
                    )
                  }
                >
                  Проложить маршрут
                </button>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* <RouterComponent data={offices} /> */}
      </MapContainer>
    </>
  );
};
