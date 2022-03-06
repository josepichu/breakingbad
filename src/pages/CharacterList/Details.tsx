import React, { FC } from "react";
import { useNavigate, NavigateOptions, useLocation } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

import Page from "../../components/Layout/Page";
import LabelValue from "../../components/common/LabelValue";
import SeasonsAppearance from "../../components/common/SeasonsAppearance";
import { Date } from "../../utils";

import "./styles.css";

const CharacterDetails: FC = () => {
  const { t } = useTranslation();
  const { state }: NavigateOptions = useLocation();
  const navigate = useNavigate();

  const {
    img,
    name,
    nickname,
    status,
    portrayed,
    birthday,
    occupation,
    appearance,
  } = state.data;

  return (
    <Page className="character-details">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          size="small"
          onClick={() => navigate("/")}
        >
          {t("app.actions.back")}
        </Button>
        <Box display="flex">
          <Button variant="text" startIcon={<ArrowBackIcon />} size="small">
            {t("characters.back")}
          </Button>
          <Button variant="text" endIcon={<ArrowForwardIcon />} size="small">
            {t("characters.following")}
          </Button>
        </Box>
      </Box>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item md={5} sm={12}>
          <img src={img} alt={name} width={400} />
        </Grid>
        <Grid item md={7} sm={12}>
          <Box display="flex" alignItems="center">
            <Typography variant="h4">{name}</Typography>
            <Typography
              variant="h6"
              sx={{ marginLeft: 1, color: "gray" }}
            >{`(${nickname})`}</Typography>
          </Box>
          <Box className="character-details__items">
            <LabelValue label={t("characters.realName")} value={portrayed} />
            <LabelValue
              label={t("characters.age")}
              value={`${
                Date.getAgeFromDate(birthday) ?? t("characters.unknownAge")
              }`}
            />
            <LabelValue label={t("characters.status")} value={status} />
            <LabelValue
              label={t("characters.occupation")}
              value={occupation.join(", ")}
            />
            <LabelValue
              label={t("characters.seasonsAppearance")}
              value={<SeasonsAppearance seasons={appearance} />}
            />
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default CharacterDetails;
