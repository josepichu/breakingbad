import React, { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export interface BackdropStateInterface {
  isLoading: boolean;
  setIsLoading(isLoading: boolean): void;
}

export const backdropInitialState: BackdropStateInterface = {
  isLoading: false,
  setIsLoading: () => false,
};

export const BackdropContext =
  React.createContext<BackdropStateInterface>(backdropInitialState);

const reducer = (
  state: BackdropStateInterface = backdropInitialState,
  action
): BackdropStateInterface => {
  const {
    type,
    payload: { isLoading },
  } = action;
  switch (type) {
    case "set-isloading":
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
};

export const useBackdrop = () => {
  const context = React.useContext(BackdropContext);

  if (!context) {
    throw new Error("useBackdrop must be used within a BackdropContext");
  }
  return context;
};

export const BackdropProvider: FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, backdropInitialState);

  const setIsLoading = (isLoading: Boolean) =>
    dispatch({ type: "set-isloading", payload: { isLoading } });

  return (
    <BackdropContext.Provider
      value={{
        ...state,
        setIsLoading,
      }}
    >
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.isLoading}
        onClick={() => state.setIsLoading(true)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BackdropContext.Provider>
  );
};
