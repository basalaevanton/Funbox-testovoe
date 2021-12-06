import React, { useEffect } from "react";

import styles from "./Input.module.scss";

import cn from "classnames";

export const MapSuggestInput = (props: any): JSX.Element => {
  const { ymaps } = props;

  useEffect(() => {
    const suggestView = new ymaps.SuggestView("suggest");
  }, [ymaps.SuggestView]);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={cn(styles.input)}
        type="text"
        id="suggest"
        placeholder="Новая точка маршрута"
      />
    </div>
  );
};
