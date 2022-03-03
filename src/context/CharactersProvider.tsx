import React, { FC } from "react";
import { useAPI } from "../hooks/useAPI";
import { apiStatusInterface } from "../models/Api/apiStatusInterface";
import { Character } from "../models/Character";

export interface CharactersStateInterface {
  apiStatus: apiStatusInterface<Character[]>;
}

export const invoicesInitialState: CharactersStateInterface = {
  apiStatus: {
    data: [],
    isLoading: false,
  },
};

export const CharactersContext =
  React.createContext<CharactersStateInterface>(invoicesInitialState);

const reducer = (
  state: CharactersStateInterface = invoicesInitialState,
  action
): CharactersStateInterface => {
  const {
    type,
    payload: { data },
  } = action;
  switch (type) {
    case "characters-fulfilled":
      return {
        ...state,
        apiStatus: {
          data,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};

export const useCharacters = () => {
  const context = React.useContext(CharactersContext);

  if (!context) {
    throw new Error("useCharacters must be used within a CharactersContext");
  }
  return context;
};

export const CharactersProviders: FC = ({ children }) => {
  const [state] = React.useReducer(reducer, invoicesInitialState);

  const { apiStatus } = useAPI<Character[]>({ url: "characters" });

  return (
    <CharactersContext.Provider
      value={{
        ...state,
        apiStatus,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
