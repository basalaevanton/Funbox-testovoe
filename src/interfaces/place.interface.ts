export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Place extends Coords {
  id: number;
  order: number;
  adress: string;
}
