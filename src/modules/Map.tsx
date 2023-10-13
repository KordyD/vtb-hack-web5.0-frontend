import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import data from '../utils/offices.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MarkerCluster, divIcon, icon, point } from 'leaflet';

const offices = data;
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
      </MapContainer>
    </>
  );
};
