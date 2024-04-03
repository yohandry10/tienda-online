import React from 'react';
import ReactDOM from 'react-dom'; // Corrige la importación de ReactDOM
import './index.css';
import App from './App';

import './firebase-config'; // Importa la configuración de Firebase aquí

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


