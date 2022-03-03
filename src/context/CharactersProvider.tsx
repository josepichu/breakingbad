import React, { FC } from "react";

export interface CharactersStateInterface {}

export const invoicesInitialState: CharactersStateInterface = {};

export const CharactersContext =
  React.createContext<CharactersStateInterface>(invoicesInitialState);

const reducer = (
  state: CharactersStateInterface = invoicesInitialState,
  action
): CharactersStateInterface => {
  const { type } = action;
  switch (type) {
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

export const InvoicesProvider: FC = ({ children }) => {
  const [state] = React.useReducer(reducer, invoicesInitialState);

  return (
    <CharactersContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
