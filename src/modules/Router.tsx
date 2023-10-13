import { useMap } from 'react-leaflet';
import { Routing, latLng } from 'leaflet';

import 'leaflet-routing-machine';
import 'lrm-graphhopper';

export interface Data {
  salePointName: string;
  address: string;
  status: string;
  openHours: [
    {
      days: string;
      hours: string;
    }
  ];
  rko: string;
  openHoursIndividual: [
    {
      days: string;
      hours: string;
    }
  ];
  officeType: string;
  salePointFormat: string;
  suoAvailability: string;
  hasRamp: string;
  latitude: number;
  longitude: number;
  metroStation: string | null;
  distance: number;
  kep: boolean;
  myBranch: boolean;
}

interface RouterProps {
  data: Data[];
}

export const RouterComponent = ({ data }: RouterProps) => {
  const map = useMap();
  const route = Routing.control({
    waypoints: [
      latLng(55.7522, 37.6156),
      latLng(data[0].latitude, data[0].longitude),
    ],
    createMarker: function () {
      return null;
    },
    routeWhileDragging: false,
    show: false,
    addWaypoints: false,
    router: Routing.graphHopper('674c54dd-0cec-4e17-a404-31c248a4bdf8'),
  });
  route.addTo(map);
  return null;
};
