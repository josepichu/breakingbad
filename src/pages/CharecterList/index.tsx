import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useAPI } from '../../hooks/useAPI';

import { Character } from '../../models/Character';
import Page from '../../components/Layout/Page';
import CharacterCard from '../../components/CharacterCard';

const CharacterList: FC = () => {
  const { apiStatus: { data } } = useAPI<Character[]>({ url: 'characters' });

  return (
    <Page>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {!!data && data.map((character: Character) => <CharacterCard data={character} />)}
      </Box>
    </Page>
  );
};

export default CharacterList;
