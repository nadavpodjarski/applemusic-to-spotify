import * as types from "../types";
import * as actions from "./";

import {
  DESTINATION_LOCAL_STORGAE_KEY,
  musicProvidersConfig,
  User,
} from "../../utils";

const requestErr = (payload: any) => ({
  type: types.DESTNATION_REQUEST_ERROR,
  payload,
});

const login = () => ({
  type: types.DESTINATION_LOGIN,
});

export const setDestinationCurrentUser = (payload: any) => ({
  type: types.SET_DESTINATION_CURRENT_USER,
  payload,
});

export const setDestinationPlaylists = (payload: any) => ({
  type: types.SET_DESTINATION_PLAYLISTS,
  payload,
});

export const getDestinationPlaylists = ({
  provider,
  currentUser,
}: {
  provider: string;
  currentUser: User;
}) => async (dispatch: any) => {
  try {
    dispatch({ type: types.GET_DESTINATION_PLAYLISTS });
    const playlists = await musicProvidersConfig[provider].getPlaylists(
      currentUser
    );
    dispatch(setDestinationPlaylists({ playlists }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};

export const destinationLogin = ({
  provider,
}: {
  [key: string]: string;
}) => async (dispatch: any) => {
  try {
    dispatch(login());
    const currentUser = await musicProvidersConfig[provider].login();
    if (!currentUser) return;
    dispatch(actions.setDestinationProvider({ provider }));
    dispatch(setDestinationCurrentUser({ currentUser }));
    dispatch(getDestinationPlaylists({ provider, currentUser }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};

export const destinationLogout = ({
  provider,
}: {
  [key: string]: string;
}) => async (dispatch: any) => {
  try {
    await musicProvidersConfig[provider].logout();
    localStorage.removeItem(DESTINATION_LOCAL_STORGAE_KEY);
    dispatch({ type: types.DESTINATION_LOGOUT });
    dispatch(actions.setDestinationProvider({ provider: "" }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};
