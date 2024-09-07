import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import News from './components/News';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <News category="general" /> },
      { path: '/business', element: <News category="business" /> },
      { path: '/entertainment', element: <News category="entertainment" /> },
      {
        path: '/general', element:
          <ErrorBoundary>
            <News category="general" />
          </ErrorBoundary>
      },
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
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
