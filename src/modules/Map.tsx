import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import data from '../utils/offices.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MarkerCluster, Routing, divIcon, icon, latLng, point } from 'leaflet';
import { useEffect } from 'react';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { RouterComponent } from './Router';
import { Data } from './Router';

const offices = data as Data[];
const markerIcon = icon({
  iconUrl: '/VTB-map-icon.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 69],
});
// 674c54dd-0cec-4e17-a404-31c248a4bdf8
const createRoute = () => {};

const createCustomIcon = (cluster: MarkerCluster) => {
  return divIcon({
    html: `<div
        style="
          border-radius: 50%;
          background-color: white;
          border-width: 2px;
          border-color: #0A2973;
          border-style: solid;
          padding: 5px;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          "
        
      >
      <div>${cluster.getChildCount()}</div>
      </div>`,

    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export const Map = () => {
  return (
    <>
      <MapContainer
        style={{ height: '100vh' }}
        center={[55.7522, 37.6156]}
        zoom={9}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
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
        <RouterComponent data={offices} />
      </MapContainer>
    </>
  );
};
