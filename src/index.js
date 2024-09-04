import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import News from './components/News';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <News category="general" /> },
      { path: '/business', element: <News category="business" /> },
      { path: '/entertainment', element: <News category="entertainment" /> },
      { path: '/general', element: <News category="general" /> },
      { path: '/health', element: <News category="health" /> },
      { path: '/science', element: <News category="science" /> },
      { path: '/sports', element: <News category="sports" /> },
      { path: '/technology', element: <News category="technology" /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
