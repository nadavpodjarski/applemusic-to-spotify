import { Song as SongType, convertMilliseconds } from "../utils";
import { ListItem, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    display: "flex",
    flexDirection: "column",
  },
  secondaryText: { fontSize: 12 },
  time: {
    marginLeft: "auto",
  },
  item: {
    display: "flex",
    gap: theme.spacing(1),
  },
}));

const Song = ({ artist, duration, image, name, id }: SongType) => {
  const classes = useStyles();
  return (
    <ListItem divider button dense key={id} className={classes.item}>
      <img src={image} alt="" width={36} height={36} />
      <div className={classes.text}>
        <Typography component="span">{name}</Typography>
        <Typography
          component="span"
          color="textSecondary"
          classes={{ root: classes.secondaryText }}
        >
          {artist}
        </Typography>
      </div>
      {duration && (
        <span className={classes.time}>{convertMilliseconds(duration)}</span>
      )}
    </ListItem>
  );
};

export default Song;
