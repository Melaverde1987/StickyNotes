import '@fontsource/grape-nuts';

export const theme = {
  colors: {
    text: '#232121',
    body: '#efefef',
    primary500: 'lightgreen',
    secondary500: 'midnightblue',
    white: '#ffffff',
    black: '#000000',
    gray500: '#e8e8e8',
    gray600: 'gray',
    gray700: 'darkgrey',
    border: 'rgb(65 64 64 / 20%)',
  },

  fonts: {
    primary: "'Grape Nuts', cursive",
    secondary: 'Arial, Helvetica, sans-serif',
  },

  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },

  radii: {
    sm: '6px',
    md: '8px',
  },

  transition: {
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  breakpoints: {
    tablet: '768px',
    desktop: '1200px',
  },
};
