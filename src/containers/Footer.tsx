import { makeStyles, Typography } from "@material-ui/core"
import { Github } from "@styled-icons/bootstrap/"

const useStyles = makeStyles(theme => ({
   root: {
      boxShadow: theme.shadows[2],
      height: 36,
      padding: theme.spacing(1.5),
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      background: theme.palette.background.paper,
      userSelect: "none",
      alignItems: "center"
   },
   icon: {
      height: 24,
      width: 24,
      color: theme.palette.text.primary,
      "&:hover": {
         color: theme.palette.text.secondary
      },
      cursor: "default"
   },
   iconPhrase: {
      display: "flex",
      gap: theme.spacing(1),
      color: theme.palette.text.secondary
   }
}))

const Footer = () => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <div className={classes.iconPhrase}>
            <Typography>Made by</Typography>
            <a
               href="https://github.com/nadavpodjarski/applemusic-to-spotify"
               target="_blank"
               rel="noreferrer"
            >
               <Github className={classes.icon} />
            </a>
         </div>
      </div>
   )
}

export default Footer
