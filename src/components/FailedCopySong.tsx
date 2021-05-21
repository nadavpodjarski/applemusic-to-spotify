import {
  ListItem,
  ListItemIcon,
  Tooltip,
  makeStyles,
  ListItemText,
} from "@material-ui/core";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { musicProvidersConfig, Song } from "../utils";

import { Copy } from "@styled-icons/boxicons-regular/";
import { Warning } from "@styled-icons/fluentui-system-filled/";
import { Open } from "@styled-icons/ionicons-outline/";

type FailedSongProps = {
  song: Song;
  provider: string;
};

const useStyles = makeStyles((theme) => ({
  iconButton: {
    height: 20,
    width: 20,
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
    cursor: "default",
  },
  warning: {
    height: 20,
    width: 20,
    color: theme.palette.warning.main,
  },
  list: {
    width: "100%",
  },
  listIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FailedCopySong = ({ song, provider }: FailedSongProps) => {
  const classes = useStyles();

  return (
    <ListItem dense divider key={song.id}>
      <ListItemIcon className={classes.listIcon}>
        <Warning className={classes.warning} />
      </ListItemIcon>
      <ListItemText>
        {song.name} {song.artist}
      </ListItemText>
      <ListItemIcon className={classes.listIcon}>
        <CopyToClipboard text={`${song.artist} ${song.name}`}>
          <Tooltip title="Copy song" placement="top">
            <Copy className={classes.iconButton} />
          </Tooltip>
        </CopyToClipboard>
      </ListItemIcon>
      <ListItemIcon className={classes.listIcon}>
        <Tooltip title="Go to website" placement="top">
          <a
            target="_blank"
            rel="noreferrer"
            href={musicProvidersConfig[provider].searchURI(
              `${song.artist} ${song.name}`
            )}
          >
            <Open className={classes.iconButton} />
          </a>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  );
};
export default FailedCopySong;
