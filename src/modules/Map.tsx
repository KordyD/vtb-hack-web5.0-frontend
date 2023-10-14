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
import { useState, useRef, useMemo } from 'react';

const offices = data as Data[];
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

interface MapProps {
  distancesHandler: (distances: number[]) => void;
}

// TODO: Подключить Redux. Отрисовывать объекты в списке только в рамках карты.
// FIXME: Причесать код ниже, выглядит плохо
// Краткая задача кода ниже: брать геолокацию юзера и писать дистанцию от отделений до него

export const Map = ({ distancesHandler }: MapProps) => {
  const mapRef = useRef(null);

  const distances: number[] = [];

  const DistanceGetter = (coord1: LatLng, coord2: LatLng) => {
    const map = mapRef.current;
    if (!map) {
      return null;
    }
    const distance = map.distance(coord1, coord2);

    distances.push(distance);

    return null;
  };

  const [coords, setCoords] = useState<number[]>([55.7522, 37.6156]);

  navigator.geolocation.watchPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords([latitude, longitude]);
      offices.forEach((item) =>
        DistanceGetter(
          latLng(coords[0], coords[1]),
          latLng(item.latitude, item.longitude)
        )
      );
      distancesHandler(distances);
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
          {offices.map((item, index) => (
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
