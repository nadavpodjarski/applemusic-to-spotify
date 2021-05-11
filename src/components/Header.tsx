import { Typography, Button, makeStyles } from "@material-ui/core";

interface IHeader {
  title: string;
  logout: () => void;
  isLoggedIn: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    background: "black",
    height: 56,
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: 8,
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  logout: {
    background: "white",
    "&:hover": {
      background: "rgba(255,255,255,0.9)",
    },
  },
}));

const Header = ({ title, logout, isLoggedIn }: IHeader) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>{title}</Typography>
      {isLoggedIn && (
        <Button className={classes.logout} onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Header;
