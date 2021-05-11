import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export let theme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    button: {
      textTransform: "none",
      fontFamily: "inherit",
    },
    fontFamily: "inherit",
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
        fontFamily: "Poppins",
      },
    },
  },
});

theme = responsiveFontSizes(theme);
