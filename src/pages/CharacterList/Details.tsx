import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

import Page from "../../components/Layout/Page";
import LabelValue from "../../components/common/LabelValue";
import SeasonsAppearance from "../../components/common/SeasonsAppearance";
import { Date } from "../../utils";

import "./styles.css";
import { useCharacters } from "../../context/CharactersProvider";

const CharacterDetails: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    selectedCharacter,
    setSelectedCharacter,
    getNextCharacter,
    getPrevCharacter,
  } = useCharacters();

  if (!selectedCharacter) navigate("/");

  return (
    <Page className="character-details">
      {!!selectedCharacter && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              size="small"
              onClick={() => navigate("/")}
            >
              {t("app.actions.back")}
            </Button>
            <Box display="flex">
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                size="small"
                disabled={!getPrevCharacter()}
                onClick={() => setSelectedCharacter(getPrevCharacter())}
              >
                {t("characters.back")}
              </Button>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                size="small"
                disabled={!getNextCharacter()}
                onClick={() => setSelectedCharacter(getNextCharacter())}
              >
                {t("characters.following")}
              </Button>
            </Box>
          </Box>
          <Grid container style={{ marginTop: 20 }}>
            <Grid item md={5} sm={12}>
              <img
                src={selectedCharacter.img}
                alt={selectedCharacter.name}
                width={400}
              />
            </Grid>
            <Grid
              item
              md={7}
              sm={12}
              sx={{
                marginTop: {
                  xs: 2,
                  md: 0,
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h4">{selectedCharacter.name}</Typography>
                <Typography
                  variant="h6"
                  sx={{ marginLeft: 1, color: "gray" }}
                >{`(${selectedCharacter.nickname})`}</Typography>
              </Box>
              <Box className="character-details__items">
                <LabelValue
                  label={t("characters.realName")}
                  value={selectedCharacter.portrayed}
                />
                <LabelValue
                  label={t("characters.age")}
                  value={`${
                    Date.getAgeFromDate(selectedCharacter.birthday) ??
                    t("characters.unknownAge")
                  }`}
                />
                <LabelValue
                  label={t("characters.status")}
                  value={selectedCharacter.status}
                />
                <LabelValue
                  label={t("characters.occupation")}
                  value={selectedCharacter.occupation.join(", ")}
                />
                <LabelValue
                  label={t("characters.seasonsAppearance")}
                  value={
                    <SeasonsAppearance seasons={selectedCharacter.appearance} />
                  }
                />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  {selectedCharacter.quotes[
                    Math.floor(Math.random() * selectedCharacter.quotes.length)
                  ]?.quote
                    ? `"${
                        selectedCharacter.quotes[
                          Math.floor(
                            Math.random() * selectedCharacter.quotes.length
                          )
                        ].quote
                      }"`
                    : ""}
                </Typography>
              </Box>
            </Grid>
          </Grid>{" "}
        </>
      )}
    </Page>
  );
};

export default CharacterDetails;
