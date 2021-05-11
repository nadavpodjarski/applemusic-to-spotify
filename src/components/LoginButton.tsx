import { CSSProperties } from "react";
import { makeStyles, Typography } from "@material-ui/core";

interface ILogin {
  login: () => void;
  logo: any;
  style: Pick<CSSProperties, "background" | "color" | "fontFamily">;
  displayName: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 1),
    boxSizing: "border-box",
    background: (style: any) => style.background,
    color: (style: any) => style.color,
    "&:hover": {
      boxShadow: theme.shadows[3],
    },
    cursor: "pointer",
    width: 250,
    height: 48,
    transition: "box-shadow 0.1s linear",
    borderRadius: 4,
    fontFamily: (style: any) => style.fontFamily || "inherit",
  },
  text: {
    marginLeft: theme.spacing(1.5),
    fontWeight: 500,
  },
  logo: {
    height: 32,
    width: 32,
  },
}));

const Login = ({ login, logo: Logo, style, displayName }: ILogin) => {
  const classes = useStyles(style);
  return (
    <div className={classes.root} onClick={login}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <Typography className={classes.text}>Login to {displayName}</Typography>
    </div>
  );
};

export default Login;
