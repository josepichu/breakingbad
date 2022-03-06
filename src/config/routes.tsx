/* eslint-disable react/react-in-jsx-scope */
import { Route } from "../models/App/Route";
import CharacterList from "../pages/CharacterList";
import Details from "../pages/CharacterList/Details";

export const routes: Route[] = [
  {
    key: "home",
    path: "/",
    component: () => <CharacterList />,
  },
  {
    key: "character-details",
    path: "/character-details",
    component: () => <Details />,
  },
];
