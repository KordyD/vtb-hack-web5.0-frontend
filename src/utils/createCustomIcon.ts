import { MarkerCluster, divIcon, point } from 'leaflet';

export const createCustomIcon = (cluster: MarkerCluster) => {
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
