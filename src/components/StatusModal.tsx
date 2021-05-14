import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

import {
  makeStyles,
  Dialog,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
} from "@material-ui/core";

import Loader from "./Loader";
import FailedCopySong from "./FailedCopySong";

import { BadgeCheck } from "@styled-icons/boxicons-regular/";

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
  const { destination } = useSelector((state) => state.app);

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
                  </ListItem>
                  {failedCopySongs?.map((song) => (
                    <FailedCopySong {...{ song, provider: destination }} />
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
