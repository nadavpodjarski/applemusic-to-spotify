import { Song as SongProps, convertMilliseconds } from "../utils"
import { ListItem, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
   text: {
      display: "flex",
      flexDirection: "column"
   },
   secondaryText: { fontSize: 12 },
   time: {
      marginLeft: "auto"
   },
   item: {
      display: "flex",
      gap: theme.spacing(1)
   },
   image: {
      height: 36,
      width: 36,
      borderRadius: theme.spacing(0.5)
   }
}))

const Song = ({ artist, duration, image, name, id }: SongProps) => {
   const classes = useStyles()
   return (
      <ListItem divider button dense key={id} className={classes.item}>
         <img src={image} alt="" className={classes.image} />
         <div className={classes.text}>
            <Typography color="textPrimary" component="span">
               {name}
            </Typography>
            <Typography
               component="span"
               color="textSecondary"
               classes={{ root: classes.secondaryText }}
            >
               {artist}
            </Typography>
         </div>
         {duration && (
            <Typography color="textSecondary" className={classes.time}>
               {convertMilliseconds(duration)}
            </Typography>
         )}
      </ListItem>
   )
}

export default Song
