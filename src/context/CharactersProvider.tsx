import React, { FC } from "react";
import { useAPI } from "../hooks/useAPI";
import { apiOptsInterface } from "../models/Api/apiOptsInterface";
import { apiStatusInterface } from "../models/Api/apiStatusInterface";
import { Character } from "../models/Character";
import { Quote } from "../models/Quote";
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
  const { type } = action;
  switch (type) {
    case "characters-pending":
      return {
        ...state,
        apiStatus: {
          data: [],
          isLoading: true,
        },
      };
    case "characters-fulfilled": {
      const {
        payload: { data },
      } = action;
      return {
        ...state,
        apiStatus: {
          data,
          isLoading: false,
        },
      };
    }
    case "characters-erros": {
      const {
        payload: { error },
      } = action;
      return {
        ...state,
        apiStatus: {
          data: [],
          isLoading: false,
          error,
        },
      };
    }
    case "characters-filtered": {
      const {
        payload: { data, searchCharacterValue },
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
   * useAPI initialization for characters
   */
  const {
    apiStatus: {
      data: characters,
      error: charErros,
      isLoading: isLoadingCharacters,
    },
    dispatchAPIOpts: fetchCharacters,
  } = useAPI<Character[]>({ url: "characters", wait: true });

  /**
   * useAPI initialization for quotes
   */
  const {
    apiStatus: { data: quotes, error: quotesErros, isLoading: isLoadingQuotes },
    dispatchAPIOpts: fetchQuotes,
  } = useAPI<Quote[]>({ url: "quotes", wait: true });

  /**
   * fetch characters and quotes on init and then integrated them into single data model
   */
  React.useEffect(() => {
    dispatch({ type: "characters-pending" });
    fetchCharacters({ url: "characters" });
    fetchQuotes({ url: "quotes" });
  }, []);

  /**
   * catch errors
   */
  React.useEffect(() => {
    if (charErros || quotesErros)
      dispatch({
        type: "characters-error",
        payload: { error: `${charErros}, ${quotesErros}` },
      });
  }, [charErros, quotesErros]);

  React.useEffect(() => {
    if (!isLoadingCharacters && !isLoadingQuotes) {
      const data = characters.map((character: Character) => ({
        ...character,
        quotes: quotes.filter(
          (quote: Quote) => quote.author === character.name
        ),
      }));
      dispatch({
        type: "characters-fulfilled",
        payload: { data: Array.shuffleArray(data) },
      });
    }
  }, [isLoadingQuotes, isLoadingCharacters]);

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
        fetchCharacters,
        filterData,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
