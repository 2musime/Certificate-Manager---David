import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './components/context/LanguageContext';
import { UserProvider } from './components/context/UserContext';
import './styles/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>
);



