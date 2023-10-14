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
