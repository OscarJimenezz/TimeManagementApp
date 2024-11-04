import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  ReactDOM.render(<App />, rootElement);
};

renderApp();