import { useMemo } from "react";
import { ListItem, makeStyles, Tooltip } from "@material-ui/core";
import { SendCopy } from "@styled-icons/fluentui-system-filled/";
import { Song, convertMilliseconds } from "../utils";

type PlaylistHeaderType = {
  title: string;
  id: string;
  onCopy?: "" | ((id: string) => void);
  image?: any;
  songs: Song[];
};

const useStyles = makeStyles((theme) => ({
  copyButton: {
    height: 24,
    width: 24,
    cursor: "pointer",
    marginLeft: "auto",
  },

  title: {
    display: "flex",
    gap: theme.spacing(2),
    height: 80,
  },

  image: {
    height: 64,
    width: 64,
    borderRadius: theme.spacing(0.5),
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: "auto",
  },
}));

const PlaylistHeader = ({
  title,
  onCopy,
  id,
  image,
  songs,
}: PlaylistHeaderType) => {
  const classes = useStyles();

  const [totalSongs, totalDuration] = useMemo(() => {
    return songs.reduce(
      ([totalSongs, totalDuration], song) => {
        totalDuration += song.duration || 0;
        totalSongs += 1;
        return [totalSongs, totalDuration];
      },
      [0, 0]
    );
  }, [songs]);

  return (
    <ListItem divider className={classes.title}>
      <img src={image} alt="" className={classes.image} />

      <div className={classes.text}>
        <span>{title}</span>
        <div>
          <span>{totalSongs} songs, </span>
          <span>{convertMilliseconds(totalDuration, true)}</span>
        </div>
      </div>

      {onCopy && (
        <Tooltip title="Copy Playlist">
          <span className={classes.copyButton}>
            <SendCopy onClick={() => onCopy(id)} />
          </span>
        </Tooltip>
      )}
    </ListItem>
  );
};

export default PlaylistHeader;
