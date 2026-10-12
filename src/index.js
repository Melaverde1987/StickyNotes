import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'GlobalStyle';
import { theme } from 'theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
  root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/StickyNotes">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

renderApp();
