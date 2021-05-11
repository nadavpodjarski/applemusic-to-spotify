import { ListItem, makeStyles, Tooltip } from "@material-ui/core";
import { SendCopy } from "@styled-icons/fluentui-system-filled/";

type PlaylistHeaderType = {
  title: string;
  id: string;
  onCopy?: "" | ((id: string) => void);
};

const useStyles = makeStyles((theme) => ({
  copyButton: {
    height: 24,
    width: 24,
    cursor: "pointer",
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
    background: theme.palette.divider,
    height: 64,
  },
}));

const PlaylistHeader = ({ title, onCopy, id }: PlaylistHeaderType) => {
  const classes = useStyles();

  return (
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
  );
};

export default PlaylistHeader;
