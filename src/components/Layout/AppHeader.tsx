import React, { FC } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("app.title")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
