import React, { FC } from "react";
import { useAPI } from "../hooks/useAPI";
import { apiOptsInterface } from "../models/Api/apiOptsInterface";
import { apiStatusInterface } from "../models/Api/apiStatusInterface";
import { Character } from "../models/Character";
import { Array } from "../utils";

export interface CharactersStateInterface {
  apiStatus: apiStatusInterface<Character[]>;
  fetchCharacters: React.Dispatch<apiOptsInterface>;
  filterData(e): void;
  searchCharacterValue: string;
  filteredData: Character[];
  hasFilteredData: boolean;
}

export const invoicesInitialState: CharactersStateInterface = {
  apiStatus: {
    data: [],
    isLoading: false,
  },
  searchCharacterValue: "",
  filteredData: [],
  hasFilteredData: false,
  fetchCharacters: () => null,
  filterData: () => null,
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
    case "characters-filtered": {
      const {
        payload: { searchCharacterValue },
      } = action;
      return {
        ...state,
        filteredData: data,
        searchCharacterValue,
        hasFilteredData: data.length > 0,
      };
    }
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
  const [state, dispatch] = React.useReducer(reducer, invoicesInitialState);

  /**
   * data is shuffled and saved within context
   */
  const onFetchedCharacters = (data: Character[]) => {
    dispatch({
      type: "characters-fulfilled",
      payload: { data: Array.shuffleArray(data) },
    });
  };

  /**
   * useAPI initialization for characters
   */
  const { apiStatus, dispatchAPIOpts: fetchCharacters } = useAPI<Character[]>(
    { url: "characters", wait: true },
    onFetchedCharacters
  );

  /**
   * fetch characters on init
   */
  React.useEffect(() => {
    fetchCharacters({ url: "characters" });
  }, []);

  /**
   * filter character data by name, nickname or portrayed
   */
  const filterData = (value: string) => {
    const valueToSearch = value.toLowerCase();
    const filteredCharacters = state.apiStatus.data.filter(
      (character: Character) =>
        character.name.toLowerCase().includes(valueToSearch) ||
        character.nickname.toLowerCase().includes(valueToSearch) ||
        character.portrayed.toLowerCase().includes(valueToSearch)
    );
    dispatch({
      type: "characters-filtered",
      payload: { data: filteredCharacters, searchCharacterValue: value },
    });
  };

  return (
    <CharactersContext.Provider
      value={{
        ...state,
        apiStatus,
        fetchCharacters,
        filterData,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
