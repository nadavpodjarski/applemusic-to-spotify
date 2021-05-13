import { memo } from "react";
import { List, makeStyles } from "@material-ui/core";

import { Playlist as PlaylistType } from "../utils";

import Song from "./Song";
import PlaylistHeader from "./PlaylistHeader";

type PlaylistProps = {
  onCopy?: "" | ((id: string) => void);
} & PlaylistType;

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

const Playlist = ({ songs, title, id, onCopy, image }: PlaylistProps) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <PlaylistHeader {...{ onCopy, id, title, image, songs }} />
      {songs.map((song, i) => (
        <Song {...{ ...song }} key={title + song.id + i} />
      ))}
    </List>
  );
};

const playlistPropsAreEqual = (
  prevProps: PlaylistType,
  nextProps: PlaylistType
) => prevProps.title === nextProps.title;

export default memo(Playlist, playlistPropsAreEqual);
