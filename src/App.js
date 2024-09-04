import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar';
import BackToTopButton from './components/BackToTopButton';
import './App.css';

export const AppContext = React.createContext();

const App = () => {
  const pageSize = 9;
  const apikey = process.env.REACT_APP_API_KEY;
  const country = process.env.REACT_APP_COUNTRY;
  const [progress, setProgress] = useState(0);
  const [isDark, setDark] = useState(false);
  const [articles, setArticles] = useState([]);

  return (
    <AppContext.Provider value={{ apikey, pageSize, country, progress, setProgress, isDark, setDark, articles, setArticles }}>
      <div className='App' data-theme={isDark ? 'dark' : 'light'}>
        <NavBar />
        <LoadingBar color='#f11946' progress={progress} />
        <Outlet />
        <BackToTopButton />
      </div>
    </AppContext.Provider>
  );
};

export default App;
