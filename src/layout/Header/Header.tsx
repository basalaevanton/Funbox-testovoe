import React from "react";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";

import cn from "classnames";
import { Typography } from "@mui/material";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      <Typography variant="h2" component="div">
        Тестовое от Funbox
      </Typography>
    </header>
  );
};
