import React, { FC } from "react";
import { Box, TextField } from "@mui/material";

import { Character } from "../../models/Character";
import { Array } from "../../utils";
import Page from "../../components/Layout/Page";
import CharacterCard from "../../components/CharacterCard";
import { useCharacters } from "../../context/CharactersProvider";

const CharacterList: FC = () => {
  const {
    apiStatus: { data },
  } = useCharacters();

  return (
    <Page>
      <TextField label="Buscar" variant="filled" />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {!!data &&
          Array.shuffleArray(data).map((character: Character) => (
            <Box
              key={character.char_id}
              sx={{
                marginTop: 2,
                marginRight: 2,
              }}
            >
              <CharacterCard key={character.char_id} data={character} />
            </Box>
          ))}
      </Box>
    </Page>
  );
};

export default CharacterList;
