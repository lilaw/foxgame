import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './sprites.css'
import './style.css'
import {GameContextProvider} from './context'

ReactDOM.render(
  <React.StrictMode>
    <GameContextProvider >
      <App/>
    </GameContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
