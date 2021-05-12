import Loader from "./Loader";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

import { makeStyles, Dialog, Typography } from "@material-ui/core";
import { Close } from "@styled-icons/evaicons-solid";

import { Song, Playlist } from "../utils";

type StatusModalType = {
  isCopying: boolean;
  isOpen: boolean;
  failedSongs: Song[];
  playlistToCopy: Playlist | null;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(1),
  },
  dialog: { padding: 0 },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: 300,
    height: "auto",
    minHeight: 300,
    flexDirection: "column",
    background: "whitesmoke",
    borderRadius: "inherit",
    gap: theme.spacing(2),
  },
  closeButton: {
    height: 24,
    width: 24,
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
  },
}));

const StatusModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    isStatusModalOpen,
    isCopying,
    playlistToCopy,
    failedCopySongs,
  } = useSelector((state) => state.status);

  const closeHandler = () => dispatch(actions.closeStatusModal());

  const successSongs = useMemo(
    () =>
      playlistToCopy?.songs &&
      playlistToCopy?.songs?.length - failedCopySongs?.length,
    [failedCopySongs]
  );

  return (
    <Dialog open={isStatusModalOpen} classes={{ paper: classes.paper }}>
      <div className={classes.root}>
        <span className={classes.closeButton}>
          <Close onClick={closeHandler} />
        </span>
        {isCopying && (
          <div>
            <Typography>Copying {playlistToCopy?.title}</Typography>
            <Loader type="Rings" color="rgba(0,0,0,0.3)" />
          </div>
        )}
        <div>
          Copied Succssefully {successSongs} out of{" "}
          {playlistToCopy?.songs.length}
        </div>
        <ul>
          {!!failedCopySongs.length && (
            <>
              <div>Failed to copy</div>
              {failedCopySongs?.map((song) => (
                <li>
                  {song.name} {song.artist}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </Dialog>
  );
};

export default StatusModal;
