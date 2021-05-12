import { makeStyles, Typography } from "@material-ui/core";

interface ITitle {
  logo: any;
  displayName: string;
  side: string;
  style?: {
    background: string;
    color: string;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    boxSizing: "border-box",
    gap: theme.spacing(1.5),
    justifyContent: "center",
    userSelect: "none",
    boxShadow: theme.shadows[4],
    zIndex: 9999,
  },
  displayName: {
    fontSize: theme.spacing(6),
    fontWeight: 700,
    position: "relative",
  },
  logo: { height: 48, width: 48 },
  side: {},
}));

const Title = ({ logo: Logo, displayName, side, style }: ITitle) => {
  const classes = useStyles();

  if (!style || !displayName)
    return (
      <Typography
        color="textPrimary"
        style={{ transform: "translateY(200px)" }}
        variant="h4"
      >
        Choose your {side}
      </Typography>
    );

  return (
    <div style={{ ...style }} className={classes.root}>
      <Typography className={classes.logo}>
        <Logo />
      </Typography>
      <Typography classes={{ root: classes.displayName }}>
        {displayName}
        <Typography
          color="textSecondary"
          component="sub"
          classes={{ root: classes.side }}
        >
          {side}
        </Typography>
      </Typography>
    </div>
  );
};

export default Title;
