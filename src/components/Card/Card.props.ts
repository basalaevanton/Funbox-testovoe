import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Place } from "../../interfaces/place.interface";

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: Place;
  deletePlace: (card: Place) => void;

  children: ReactNode;
}
