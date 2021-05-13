import { useMemo } from "react";
import { ListItem, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { SendCopy } from "@styled-icons/fluentui-system-filled/";
import { Song, convertMilliseconds } from "../utils";

type PlaylistHeaderProps = {
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
    marginLeft: "auto",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
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
}: PlaylistHeaderProps) => {
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
        <Typography color="textPrimary" component="span">
          {title}
        </Typography>
        <div>
          <Typography color="textSecondary" component="span">
            {totalSongs} songs, {convertMilliseconds(totalDuration, true)}
          </Typography>
        </div>
      </div>

      {onCopy && (
        <Tooltip title="Copy Playlist">
          <Typography component="span" className={classes.copyButton}>
            <SendCopy onClick={() => onCopy(id)} />
          </Typography>
        </Tooltip>
      )}
    </ListItem>
  );
};

export default PlaylistHeader;
