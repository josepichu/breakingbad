import React, { FC } from "react";
import { Box, TextField } from "@mui/material";

import { Character } from "../../models/Character";
import Page from "../../components/Layout/Page";
import CharacterCard from "../../components/CharacterCard";
import { useCharacters } from "../../context/CharactersProvider";

const CharacterList: FC = () => {
  const {
    apiStatus: { data },
    filteredData,
    searchCharacterValue,
    filterData,
  } = useCharacters();

  const characterList = React.useMemo(() => {
    const displayedData = searchCharacterValue ? filteredData : data;

    return displayedData.map((character: Character) => (
      <Box
        key={character.char_id}
        sx={{
          marginTop: 2,
          marginRight: 2,
        }}
      >
        <CharacterCard key={character.char_id} data={character} />
      </Box>
    ));
  }, [data, searchCharacterValue]);

  return (
    <Page>
      <TextField
        label="Buscar"
        variant="filled"
        value={searchCharacterValue}
        onChange={(e) => filterData(e.target.value)}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{characterList}</Box>
    </Page>
  );
};

export default CharacterList;
