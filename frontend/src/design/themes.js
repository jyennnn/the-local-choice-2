import { createTheme, responsiveFontSizes } from '@mui/material/styles';


const mainTheme = createTheme({
  palette: {
    primary: {
      light: '#f3efe7',
      main: '#e4dccd',
      dark: '#9f9a8f',
      contrastText: '#6b6862',
    },
    secondary: {
      light: '#adaaa3',
      main: '#99958c',
      dark: '#6b6862',
      contrastText: '#e4dccd',
    },
  },
  typography: {
    fontFamily: [
      'Poppins', 
      'sans-serif'
    ].join(','), 
  }
});

// Make the typography responsive
const responsiveMainTheme = responsiveFontSizes(mainTheme);

export default responsiveMainTheme;
