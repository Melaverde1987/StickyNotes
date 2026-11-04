import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'GlobalStyle';
import { theme } from 'theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
  root.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>

      <GlobalStyle />
    </ThemeProvider>
  );
}

renderApp();
