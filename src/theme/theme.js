import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff',
      light: '#828dff',
      dark: '#535bf2',
    },
    secondary: {
      main: '#ff4646',
      light: '#ff6b6b',
      dark: '#e63e3e',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '0.6rem 1.2rem',
        },
      },
    },
  },
}); 