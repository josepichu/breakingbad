import React, { FC } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

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

  console.log(data);

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
        label="Buscar personaje"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value={searchCharacterValue}
        onChange={(e) => filterData(e.target.value)}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
        {characterList}
      </Box>
    </Page>
  );
};

export default CharacterList;
