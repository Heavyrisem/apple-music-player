import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PlayProvider from '@contexts/playContext';
import Home from '@pages/Home';
import Play from '@pages/Play';

// TODO: 필요시 Router 분리
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/play/:videoId"
          element={
            <PlayProvider>
              <Play />
            </PlayProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
