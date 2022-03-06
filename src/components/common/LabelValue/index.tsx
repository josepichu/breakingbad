import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  label: string;
  value?: string | number | React.ReactElement;
}

const LabelValue: FC<Props> = ({ label, value }) => (
  <Box display="flex" alignItems="center">
    <Typography variant="subtitle1">{label}</Typography>
    <Typography variant="subtitle1" sx={{ marginLeft: 1, fontWeight: "bold" }}>
      {value}
    </Typography>
  </Box>
);

export default LabelValue;
