import { makeStyles, Typography } from "@material-ui/core";
import { Copyright } from "@styled-icons/boxicons-regular/";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[2],
    height: 36,
    padding: theme.spacing(1),
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    background: theme.palette.background.paper,
    userSelect: "none",
  },
  icon: {
    height: 24,
    width: 24,
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
    cursor: "default",
  },
  iconPhrase: {
    display: "flex",
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.iconPhrase}>
        <Copyright className={classes.icon} />
        <Typography>Playswish.co</Typography>
      </div>
    </div>
  );
};

export default Footer;
