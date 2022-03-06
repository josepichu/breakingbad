import React, { FC } from "react";
import { Box, Chip } from "@mui/material";

import { numberOfSeasons } from "../../../config/app";

interface Props {
  seasons: number[];
}

const numberOfSeasonsArray = Array(numberOfSeasons)
  .fill(1)
  .map((_, i) => i + 1);

const SeasonsAppearance: FC<Props> = ({ seasons }) => (
  <Box display="flex" alignItems="center">
    {numberOfSeasonsArray.map((season: number) => (
      <Chip
        label={season}
        variant={seasons.includes(season) ? "outlined" : "filled"}
        sx={{
          color: seasons.includes(season) ? "black" : "#ccc",
          bgcolor: seasons.includes(season) ? "white" : "gray[200]",
          marginRight: 1,
        }}
      />
    ))}
  </Box>
);

export default SeasonsAppearance;
