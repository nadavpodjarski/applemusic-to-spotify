import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export let theme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);
