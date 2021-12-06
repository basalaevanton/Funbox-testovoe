import React, { useState, useMemo, useEffect } from "react";
import styles from "./YmapContainer.module.scss";
import cn from "classnames";

import { withYMaps, Map, YMapsApi, Polyline } from "react-yandex-maps";

import { Card, MapSuggestInput } from "../../components";
import { Mark } from "../../components/Placemark/Placemark";

import useGeolocation from "../../hooks/useGeolocation";

import { Place } from "../../interfaces/place.interface";

const YmapContainer = (): JSX.Element => {
  const [ymaps, setYmaps] = useState<YMapsApi>();
  const [places, setPlaces] = useState<Place[]>([]);
  const coordsPosition = useGeolocation();
  const [centerMap, setCenterMap] = useState([1, 1]);
  const [currentCard, setCurrentCard] = useState<Place>();

  // центруем карту по geolocation или по новой метке
  useEffect(() => {
    if (places.length === 0) {
      if (coordsPosition.latitude && coordsPosition.longitude != null) {
        setCenterMap([coordsPosition.latitude, coordsPosition.longitude]);
      }
    } else {
      setCenterMap([
        places[places.length - 1]?.latitude,
        places[places.length - 1]?.longitude,
      ]);
    }
  }, [coordsPosition, places]);

  // coords для poliline
  const geometryPoliline: [number, number][] = places?.map((item) => [
    item.latitude,
    item.longitude,
  ]);
  // получаем place по координатам
  const getAdress = (coords: [number, number]) => {
    ymaps?.geocode(coords).then((res: any) => {
      const citi = res.geoObjects.get(0).getAddressLine();

      setPlaces([
        ...places,
        {
          id: places.length + 1,
          order: places.length + 1,
          latitude: coords[0],
          longitude: coords[1],
          adress: citi,
        },
      ]);
    });
  };
  // получаем место по координатам с карты
  const getPlace = (e: any) => {
    const coords = e.get("coords");
    getAdress(coords);
  };

  // Компонент инпута
  const SuggestInput = useMemo(() => {
    return withYMaps(MapSuggestInput, true, [
      "SuggestView",
      "geocode",
      "coordSystem.geo",
    ]);
  }, []);

  // координаты по поиску из инпута, поиск и в стэйт places
  const submitValue = (event: any) => {
    event.preventDefault();
    ymaps?.geocode(event.target[0].value).then((result: any) => {
      const coords = result.geoObjects.get(0).geometry.getCoordinates();
      getAdress(coords);
      event.target[0].value = "";
    });
  };

  // delete place from list
  const deletePlace = (card: Place) => {
    setPlaces((prevState) => prevState.filter((item) => item.id !== card.id));
  };

  // перетаскивание маркера на карте
  const changePlaceDragEnd = (
    e: any,
    id: Place["id"],
    order: Place["order"]
  ) => {
    const coords = e?.originalEvent.target.geometry.getCoordinates();
    ymaps?.geocode(coords).then((res: any) => {
      const citi = res.geoObjects.get(0).getAddressLine();
      setPlaces((prevState) => {
        const newState = [...prevState];

        newState[order - 1] = {
          id: id,
          order: order,
          latitude: coords[0],
          longitude: coords[1],
          adress: citi,
        };
        return newState;
      });
    });
  };

  // drag and drop cards with Places

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: any
  ): void {
    setCurrentCard(card);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.background = "";
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "var(--hoverCard)";
  }
  function dropHandler(e: React.DragEvent<HTMLDivElement>, card: any): void {
    e.preventDefault();

    setPlaces(
      places.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard?.order };
        }
        if (c.id === currentCard?.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );

    e.currentTarget.style.background = "";
  }

  return (
    <div className={styles.container}>
      <div className={cn(styles.places)}>
        <h1>Редактор маршрутов</h1>
        <div className={styles.searchForm}>
          <form onSubmit={submitValue}>
            <SuggestInput />
          </form>
        </div>
        <div className={styles.listPlaces}>
          {places
            ?.sort((a, b) => a.order - b.order)
            .map((card) => (
              <Card
                key={card.id}
                card={card}
                deletePlace={() => deletePlace(card)}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, card)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, card)}
              >
                <p>
                  {card.order}) {card.adress}
                </p>
              </Card>
            ))}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <Map
          className={cn(styles.map)}
          modules={["geoQuery", "geocode", "util.bounds"]}
          state={{ center: centerMap, zoom: 9 }}
          onLoad={(ymapsInstance) => {
            setYmaps(ymapsInstance);
          }}
          options={{ searchControlProvider: "yandex#search" }}
          onClick={getPlace}
        >
          <Polyline
            geometry={geometryPoliline}
            options={{
              strokeColor: "#333333",
              strokeWidth: 5,
              strokeOpacity: 0.8,
            }}
          />
          {places?.map(({ id, order, latitude, longitude, adress }) => (
            <Mark
              key={id}
              id={id}
              order={order}
              latitude={latitude}
              longitude={longitude}
              adress={adress}
              changePlaceDragEnd={changePlaceDragEnd}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default YmapContainer;
