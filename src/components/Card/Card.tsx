import React from "react";

import styles from "./Card.module.scss";

import { CardProps } from "./Card.props";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export const Card = ({
  card,
  deletePlace,
  children,
  ...props
}: CardProps): JSX.Element => {
  return (
    <div className={styles.card} {...props}>
      <div className={styles.cardChildren}>{children}</div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => deletePlace(card)}
      />
    </div>
  );
};
