import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root') || document.createElement('div');
  
  if (!document.getElementById('root')) {
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  }

  ReactDOM.render(<App />, rootElement);
};

renderApp();