import React from 'react';
import ReactDOM from 'react-dom';
import theme from 'theme';
import { ThemeProvider } from 'styled-components';
import { StoreContextProvider } from 'store';

import useFullHeightHook from 'hooks/useFullHeightHook';

import Home from 'pages/Home';
import Modals from 'component/Modals';
import './index.css';
import reportWebVitals from './reportWebVitals';

function App() {
  useFullHeightHook();

  return (
    <ThemeProvider theme={theme}>
      <StoreContextProvider>
        <Modals>
          <Home />
        </Modals>
      </StoreContextProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
