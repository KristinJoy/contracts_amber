import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
      primary: {
       light: '#FF6757',
        main: '#F0412F',
        dark: '#A20F00',
        contrastText: '#eeeeee',
        background: "#F0412F"
      },
      secondary: {
        light:'#860042',
        main: '#CD200E',
        dark: "#A24F00",
        contrastText: '#eeeeee',
          },
      default: {
        light: "#E271A8",
        main: "#C72775",
        dark: "#860042",
        contrastText: '#eeeeee',
      },
      },
      typography: {
        fontFamily: 'Plantagenet Cherokee',
        text: '#8c8c8c'
            },

  overrides: {
    MuiDrawer: {
      paper: {
        background: 'white',
          },

      },
    MuiButton: {
      text: {
        background: '"#860042"'
      }
    }
    },
    MuiPaper: {
      root: "#FFBE80"
    },
  },
);


export default theme;
