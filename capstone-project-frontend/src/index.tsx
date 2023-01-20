import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css'
import { HelmetProvider } from 'react-helmet-async';


console.log(module.id); 
console.log(module.path)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

