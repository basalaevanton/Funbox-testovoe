import React, { useState, useEffect, useRef } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";

import { Loader } from "../components";
import YmapContainer from "../container/YmapContainer/YmapContainer";
import { API } from "../helpers/api";

import { withLayout } from "../layout/Layout";

const Ymap = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const ref = useRef();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (ref) {
        setLoading(false);
      }
    }, 500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <YMaps query={{ apikey: API.KEY }} ref={ref}>
      <YmapContainer />
    </YMaps>
  );
};

export default withLayout(Ymap);
