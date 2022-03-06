import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { CardHeader } from "@mui/material";
import { Character } from "../../models/Character";
import { useCharacters } from "../../context/CharactersProvider";

import "./styles.css";

interface Props {
  data: Character;
}

const CharacterCard: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const { setSelectedCharacter } = useCharacters();

  const handleCardClick = () => {
    setSelectedCharacter(data);
    navigate("/details");
  };

  return (
    <Card
      sx={{ width: 250 }}
      className="character-card"
      onClick={handleCardClick}
    >
      <CardHeader
        avatar={<div />}
        title={`${data.name} (${data.nickname})`}
        subheader={data.portrayed}
      />
      <CardMedia component="img" height="140" image={data.img} />
    </Card>
  );
};

export default CharacterCard;
