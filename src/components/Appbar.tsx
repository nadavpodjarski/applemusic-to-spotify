import { Typography, Button, makeStyles } from "@material-ui/core"

type AppbarProps = {
   title: string
   logout: () => void
   isLoggedIn: boolean
}

const useStyles = makeStyles(theme => ({
   root: {
      width: "100%",
      background: "black",
      height: 48,
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: 8,
      boxSizing: "border-box",
      justifyContent: "space-between"
   },
   logout: {
      background: "none",
      "&:hover": {
         color: "rgba(255,255,255,0.8)"
      },
      color: "white",
      height: 32
   }
}))

const Appbar = ({ title, logout, isLoggedIn }: AppbarProps) => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <Typography>{title}</Typography>
         {isLoggedIn && (
            <Button className={classes.logout} onClick={logout}>
               Logout
            </Button>
         )}
      </div>
   )
}

export default Appbar
