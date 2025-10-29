import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import { ThemeProvider } from './context/theme-provider';
import { LayoutProvider } from './context/layout-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
