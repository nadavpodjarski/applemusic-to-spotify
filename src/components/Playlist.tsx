import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";

import { Playlist as PlaylistType } from "../utils";
import { SendCopy } from "@styled-icons/fluentui-system-filled/";

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
  copyButton: {
    height: 24,
    width: 24,
    cursor: "pointer",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(0,0,0,0.1)",
    height: 64,
  },
}));

const Playlist = ({
  songs,
  title,
  id,
  onCopy,
}: PlaylistType & { onCopy?: "" | ((id: string) => void) }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem divider className={classes.title}>
        {title}
        {onCopy && (
          <Tooltip title="Copy Playlist">
            <span className={classes.copyButton}>
              <SendCopy onClick={() => onCopy(id)} />
            </span>
          </Tooltip>
        )}
      </ListItem>
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
