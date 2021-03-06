import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  typography: {
    root:{
      h1: 'Roboto',
      h2: 'Roboto',
      h3: 'Prompt',
      h4: 'Prompt',
      h5: 'Prompt',
      h6: 'Prompt',
      p: 'Gudea',
      subtitle1: 'Gudea',
      subtitle2: 'Gudea',

    }

  },
  palette: {
      primary: {
       light: '#888888',
        main: '#565656',
        dark: '#3e3e3e',
        contrastText: '#ffffff',
        background: "#F0412F"
      },
      secondary: {
        light:'#A84E00',
        main: '#FD8732',
        dark: "#361900",
        contrastText: '#ffffff',
          },
      default: {
        light: "#E271A8",
        main: "#860042",
        dark: "#860042",
        contrastText: '#ffffff',
			}
      },


overrides: {
    MuiDrawer: {
      paper: {
        background: '#252525',
        index: "Amber Contracts"
          },
        },
    MuiDialog: {
      paper: {
        background: "#A84E00"
      },
    },

    MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          background: "linear-gradient(45deg, #EB643A 30%, #EB643A 90%)",
          color: 'white',
          text: 'Gudea',

        },
        danger: {
          color: "#fff",
          background: "#ff0000"
        },
        disabled: {
          color: '#fff',
          background: "#c0c0c0"
        }
    }
  }//closes overrides
}
);


export default theme;
