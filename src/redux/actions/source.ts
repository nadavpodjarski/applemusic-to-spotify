import * as types from "../types";
import * as actions from "./";
import { SOURCE_LOCAL_STORAGE_KEY, musicProvidersConfig } from "../../utils";

const requestErr = (payload: any) => ({
  type: types.SOURCE_REQUEST_ERROR,
  payload,
});

const login = () => ({
  type: types.SOURCE_LOGIN,
});

export const setSourceCurrentUser = (payload: any) => ({
  type: types.SET_SOURCE_CURRENT_USER,
  payload,
});

export const setSourcePlaylists = (payload: any) => ({
  type: types.SET_SOURCE_PLAYLISTS,
  payload,
});

export const getSourcePlaylists = ({
  provider,
  currentUser,
}: {
  [key: string]: string;
}) => async (dispatch: any) => {
  try {
    dispatch({ type: types.GET_SOURCE_PLAYLISTS });
    const playlists = await musicProvidersConfig[provider].getPlaylists({
      currentUser,
    });
    dispatch(setSourcePlaylists({ playlists }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};

export const sourceLogin = ({ provider }: { [key: string]: string }) => async (
  dispatch: any
) => {
  try {
    dispatch(login());
    const currentUser = await musicProvidersConfig[provider].login();
    if (!currentUser) return;
    dispatch(actions.setSourceProvider({ provider }));
    dispatch(setSourceCurrentUser({ currentUser }));
    dispatch(getSourcePlaylists({ provider, currentUser }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};

export const sourceLogout = ({ provider }: { [key: string]: string }) => async (
  dispatch: any
) => {
  try {
    await musicProvidersConfig[provider].logout();
    localStorage.removeItem(SOURCE_LOCAL_STORAGE_KEY);
    dispatch({ type: types.SOURCE_LOGOUT });
    dispatch(actions.setSourceProvider({ provider: "" }));
  } catch (err) {
    console.warn(err);
    dispatch(requestErr({ err }));
  }
};
