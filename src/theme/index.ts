import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export let theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: "Poppins",
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
