import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Playlist as PlaylistType } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    width: "90%",
    maxWidth: 600,
    boxShadow: theme.shadows[3],
    color: "black",
    borderRadius: theme.spacing(1),
  },
  text: {
    display: "flex",
    lineHeight: 0.5,
    justifyContent: "space-between",
    width: "100%",
    gap: theme.spacing(0.5),
  },
  secondaryText: { fontSize: 12 },
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Playlist = ({ songs, title }: PlaylistType) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItemText>{title}</ListItemText>
      {songs.map((song) => (
        <ListItem divider button dense key={song.id} className={classes.item}>
          <div className={classes.text}>
            <Typography
              component="span"
              color="textSecondary"
              className={classes.secondaryText}
            >
              Artist
            </Typography>
            <Typography
              component="span"
              color="textSecondary"
              className={classes.secondaryText}
            >
              Name
            </Typography>
          </div>
          <div className={classes.text}>
            <Typography component="span">{song.artist}</Typography>
            <Typography component="span">{song.name}</Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default Playlist;
