import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

import LoginForm from "./LoginForm";
import Header from "../components/Header";
import Playlist from "../components/Playlist";
import Loader from "../components/Loader";

import { getProviderStyle } from "../utils";
import * as actions from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
  },
  body: {
    overflowY: "auto",
    padding: theme.spacing(2),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const Source = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser, playlists, isLoading } = useSelector(
    (state) => state.source
  );

  const { destination, musicProviders, source: self } = useSelector(
    (state) => state.app
  );

  const style = useMemo(() => getProviderStyle({ provider: self }), [self]);

  const loginHandler = (provider: string) => async () =>
    dispatch(actions.sourceLogin({ provider }));

  const logoutHandler = async () =>
    dispatch(actions.sourceLogout({ provider: self }));

  return (
    <div className={classes.root}>
      <Header
        title="Source"
        logout={logoutHandler}
        isLoggedIn={!!currentUser}
      />
      {currentUser && self ? (
        <div className={classes.body} style={{ ...style }}>
          {isLoading ? (
            <Loader />
          ) : (
            playlists?.map((playlist) => (
              <Playlist {...{ ...playlist }} key={playlist.id} />
            ))
          )}
        </div>
      ) : (
        <LoginForm
          relevantProviders={musicProviders.filter(
            (provider) => provider !== destination
          )}
          loginHandler={loginHandler}
        />
      )}
    </div>
  );
};

export default Source;
