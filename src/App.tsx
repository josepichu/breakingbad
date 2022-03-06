import React, { FC } from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppHeader from "./components/Layout/AppHeader";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterList/Details";

import "./assets/css/App.css";

const App: FC = () => (
  <div className="app-container">
    <AppHeader />
    <Container maxWidth="lg" className="app-body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/details" element={<CharacterDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </div>
);

export default App;
