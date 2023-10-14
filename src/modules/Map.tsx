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
import { MarkerCluster, divIcon, icon, point, LatLng, latLng } from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { RouterComponent } from './Router';
import { Data } from './Router';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import iconVtb from '/VTB-map-icon.svg';
import { loadOffices } from '../slice/slice';
import { Office } from "../store/initialState"

const officeData = data as Data[];
const markerIcon = icon({
  iconUrl: '/VTB-map-icon.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 69],
});

const createCustomIcon = (cluster: MarkerCluster) => {
  return divIcon({
    html: `<div
        style="
          border-radius: 50%;
          background-color: white;
          border-width: 2px;
          border-color: #0A2973;
          border-style: solid;
          padding: 15px;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: VTBGroupUIWebBook;
          font-weight: bold;
          "
        
      >
      <div>${cluster.getChildCount()}</div>
      </div>`,

    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

// TODO: Подключить Redux. Отрисовывать объекты в списке только в рамках карты.
// FIXME: Причесать код ниже, выглядит плохо
// Краткая задача кода ниже: брать геолокацию юзера и писать дистанцию от отделений до него

export const Map = () => {
  const mapRef = useRef(null);

  const offices = useSelector(
    (state: RootState) => state.mainSlice.offices.offices 
  )

  const dispatch = useDispatch()

  const createOffice = (coord1: LatLng, item: Data) => {
    const map = mapRef.current;
    if (!map) {
      return null;
    }
    const distance: number = map.distance(coord1, latLng(item.latitude, item.longitude));

    const office: Office = {
      address: item.address,
      img: iconVtb,
      distance: distance,
    };

    return office;
  };

  const [coords, setCoords] = useState<number[]>([55.7522, 37.6156]);

  navigator.geolocation.watchPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords([latitude, longitude]);
      dispatch(loadOffices(officeData.map((item) => createOffice(latLng(coords[0], coords[1]), item))));
    },
    (error) => {
      setCoords([55.7522, 37.6156]);
    }
  );

  return (
    <>
      <MapContainer
        style={{ height: '100vh', zIndex: '0' }}
        center={[coords[0], coords[1]]}
        zoom={9}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <ZoomControl position='bottomright' />
        <Marker position={[coords[0], coords[1]]} />
        <MarkerClusterGroup
          iconCreateFunction={createCustomIcon}
          showCoverageOnHover={false}
          // polygonOptions={{ color: 'none' }}
          chunkedLoading
        >
          {officeData.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={markerIcon}
            >
              <Popup>{index}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* <Marker position={[55.7522, 37.6156]}></Marker> */}
        {/* <Marker position={[55.7522, 37.6156]} icon={markerIcon}></Marker> */}
        {/* <RouterComponent data={offices} /> */}
      </MapContainer>
    </>
  );
};
