import { Place } from "../../interfaces/place.interface";

export interface PlacemarkProps {
  id: Place["id"];
  order: Place["order"];
  latitude: Place["latitude"];
  longitude: Place["longitude"];
  adress: Place["adress"];
  changePlaceDragEnd: (e: any, id: Place["id"], order: Place["order"]) => void;
}
