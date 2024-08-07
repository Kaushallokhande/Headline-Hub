import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import BackToTopButton from './components/BackToTopButton';
import useLocalStorage from 'use-local-storage';

const App = () => {
  const pageSize = 9;
  const apikey = "1149dea25d5945388fbbd876f7cbdbd1";
  const country = 'in';
  const [progress, setProgress] = useState(0);
  const [isDark, setDark] = useLocalStorage("isDark", false);
  const [articles, setArticles] = useState([]);

  return (
    <BrowserRouter>
      <div className='App' data-theme={isDark ? 'dark' : 'light'}>
        <NavBar isDark={isDark} articles={articles} setArticles={setArticles} setDark={setDark} />
        <LoadingBar color='#f11946' progress={progress} />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="general" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="business" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="entertainment" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/general" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="general" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="health" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="science" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="sports" isDark={isDark} articles={articles} setArticles={setArticles} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="technology" isDark={isDark} articles={articles} setArticles={setArticles} />} />
        </Routes>
        <BackToTopButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
