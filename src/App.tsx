import React, { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AppHeader from './components/Layout/AppHeader';
import CharacterList from './pages/CharecterList';

import './assets/css/App.css';

const App: FC = () => (
  <div className="app-container">
    <AppHeader />
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
