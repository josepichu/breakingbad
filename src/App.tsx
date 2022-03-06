import React, { FC } from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppHeader from "./components/Layout/AppHeader";
import { Route as AppRoute } from "./models/App/Route";
import { routes } from "./config/routes";

import "./assets/css/App.css";

const App: FC = () => (
  <div className="app-container">
    <AppHeader />
    <Container maxWidth="lg" className="app-body">
      <BrowserRouter>
        <Routes>
          {routes.map((route: AppRoute) => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component()}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Container>
  </div>
);

export default App;
