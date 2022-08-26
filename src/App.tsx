import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:videoId" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
