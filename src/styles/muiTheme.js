import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  typography: {
    fontFamily: 'Playfair Display SC',
  },
  palette: {
      primary: {
       light: '#2B0018',
        main: '#360100',
        dark: '#2B0018',
        contrastText: '#ffffff',
        background: "#F0412F"
      },
      secondary: {
        light:'#A84E00',
        main: '#733500',
        dark: "#361900",
        contrastText: '#ffffff',
          },
      default: {
        light: "#E271A8",
        main: "#860042",
        dark: "#860042",
        contrastText: '#ffffff',
      },

      },


overrides: {
    MuiDrawer: {
      paper: {
        background: '#2B0018',
        index: "Amber Contracts"
          },
        },
    MuiDialog: {
      paper: {
        background: "#A84E00"
      },
    },
    MuiTypography: {
      root: {
        fontFamily: 'Autour One',
      },
    },
    a: {
      "color":"red"
    }




    },

  },
);


export default theme;
