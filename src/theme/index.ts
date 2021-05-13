import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export let theme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: "Lato",
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
  },
});

theme = responsiveFontSizes(theme);
