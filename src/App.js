import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import BackToTopButton from './components/BackToTopButton';
import useLocalStorage from 'use-local-storage';

const App = () => {
  let pageSize = 9;
  let apikey = "1149dea25d5945388fbbd876f7cbdbd1";
  let country = 'in';
  const [progress, setProgress] = useState(0);
  const [isDark, setDark] = useLocalStorage("isDark", false);
  const [articles, setArticles] = useState([]);

  return (
    <BrowserRouter>
      <div className='App' data-theme={isDark ? 'dark' : 'light'}>
        <NavBar isDark={isDark} articles={articles} setArticles={setArticles} setDark={setDark} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="general" head="" isDark={isDark} articles={articles} setArticles={setArticles} setDark={setDark} />} />
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="business" head=": Business" articles={articles} setArticles={setArticles} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="entertainment" head=": Entertainment" articles={articles} setArticles={setArticles} />} />
          <Route path="/general" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="general" head=": General" articles={articles} setArticles={setArticles} />} />
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="health" head=": Health" articles={articles} setArticles={setArticles} />} />
          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="science" head=": Science" articles={articles} setArticles={setArticles} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="sports" head=": Sports" articles={articles} setArticles={setArticles} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} pageSize={pageSize} country={country} category="technology" head=": Technology" articles={articles} setArticles={setArticles} />} />
        </Routes>
        <BackToTopButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
