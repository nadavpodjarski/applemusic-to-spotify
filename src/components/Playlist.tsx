import { List, makeStyles } from "@material-ui/core";

import { Playlist as PlaylistType } from "../utils";

import Song from "./Song";
import PlaylistHeader from "./PlaylistHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    width: "90%",
    maxWidth: 600,
    boxShadow: theme.shadows[5],
    color: "black",
    borderRadius: theme.spacing(1),
  },
}));

const Playlist = ({
  songs,
  title,
  id,
  onCopy,
  image,
}: PlaylistType & { onCopy?: "" | ((id: string) => void) }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <PlaylistHeader {...{ onCopy, id, title, image, songs }} />
      {songs.map((song) => (
        <Song {...{ ...song }} />
      ))}
    </List>
  );
};

export default Playlist;
