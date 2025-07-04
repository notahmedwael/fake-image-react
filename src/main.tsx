import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import PageReadyProvider from './components/PageReadyProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageReadyProvider>
        <App />
      </PageReadyProvider>
    </BrowserRouter>
  </StrictMode>
);
