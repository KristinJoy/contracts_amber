import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
      primary: {
       light: '#FF6757',
        main: '#F5652F',
        dark: '#DA2A62',
        contrastText: '#eeeeee',
        background: "#F0412F"
      },
      secondary: {
        light:'#ED779D',
        main: '#F59F2F',
        dark: "#DA2A62",
        contrastText: '#eeeeee',
          },
      default: {
        light: "#E271A8",
        main: "#860042",
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
        background: 'transparent',
        index: "Amber Contracts"
          },
        },


    },
    MuiPaper: {
      root: "#FFBE80"
    },
  },
);


export default theme;
