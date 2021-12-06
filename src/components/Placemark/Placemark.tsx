import React from "react";

import { Placemark } from "react-yandex-maps";
import { PlacemarkProps } from "./Placemark.props";

export const Mark = ({
  id,
  order,
  latitude,
  longitude,
  adress,
  changePlaceDragEnd,
}: PlacemarkProps): JSX.Element => {
  return (
    <>
      <Placemark
        key={id}
        geometry={[latitude, longitude]}
        options={{
          draggable: true,
          preset: "islands#redIcon",
          cursor: "pointer",
        }}
        properties={{
          balloonContent: `${order} - ${adress}`,
          iconContent: order,
        }}
        modules={["geoObject.addon.balloon"]}
        onDragEnd={(e: any) => changePlaceDragEnd(e, id, order)}
      />
    </>
  );
};
