import React from "react";

import styles from "./Loader.module.scss";

import { LoaderProps } from "./Loader.props";

export const Loader = ({ ...props }: LoaderProps): JSX.Element => {
  return <div className={styles.loader} {...props} />;
};
