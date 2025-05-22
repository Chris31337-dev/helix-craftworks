import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Articles from './pages/Articles';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/articles" element={<Articles />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;