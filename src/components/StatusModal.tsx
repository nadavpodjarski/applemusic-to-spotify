import { useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

import {
  makeStyles,
  Dialog,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  useTheme,
  Tooltip,
} from "@material-ui/core";

import Loader from "./Loader";

import { Warning } from "@styled-icons/fluentui-system-filled/";
import { BadgeCheck } from "@styled-icons/boxicons-regular/";
import { Copy } from "@styled-icons/boxicons-regular/";
import { Open } from "@styled-icons/ionicons-outline/";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(1),
  },
  root: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    width: "auto",
    height: "auto",
    minWidth: 400,
    flexDirection: "column",
    borderRadius: "inherit",
    gap: theme.spacing(2),
    boxSizing: "border-box",
  },
  closeButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  iconButton: {
    height: 24,
    width: 24,
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
  warning: {
    height: 24,
    width: 24,
    color: theme.palette.warning.main,
  },
  list: {
    width: "100%",
  },
  copyHeader: {
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(2, 0),
    boxSizing: "border-box",
  },
  badgeCheck: {
    height: 28,
    width: 28,
    color: "green",
  },
  listIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StatusModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    isStatusModalOpen,
    isCopying,
    playlistToCopy,
    failedCopySongs = [],
  } = useSelector((state) => state.status);

  const closeHandler = () => dispatch(actions.closeStatusModal());

  const successSongs = useMemo(
    () =>
      playlistToCopy?.songs &&
      playlistToCopy?.songs?.length - failedCopySongs?.length,
    // eslint-disable-next-line
    [isCopying]
  );

  return (
    <Dialog
      open={isStatusModalOpen}
      transitionDuration={0}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.root}>
        {isCopying ? (
          <>
            <div className={classes.copyHeader}>
              <Typography>Copying {playlistToCopy?.title}</Typography>
            </div>
            <Loader type="Rings" color={theme.palette.text.secondary} />
          </>
        ) : (
          <>
            <Typography component="span" className={classes.copyHeader}>
              <span className={classes.badgeCheck}>
                <BadgeCheck />
              </span>
              Copied successfully {successSongs} out of{" "}
              {playlistToCopy?.songs.length} songs
            </Typography>
            {!!failedCopySongs.length && (
              <>
                <List className={classes.list}>
                  <ListItem component="span">
                    <ListItemText>Failed to copy</ListItemText>
                    <ListItemIcon className={classes.listIcon}>
                      <Tooltip title="Go to website" placement="top">
                        <Open className={classes.iconButton} />
                      </Tooltip>
                    </ListItemIcon>
                  </ListItem>
                  {failedCopySongs?.map((song) => (
                    <ListItem divider key={song.id}>
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
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}
        <span className={classes.closeButton}>
          <Button onClick={closeHandler}>Close</Button>
        </span>
      </div>
    </Dialog>
  );
};

export default StatusModal;
