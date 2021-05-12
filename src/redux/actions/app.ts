import * as types from "../types";
import {
  SOURCE_LOCAL_STORAGE_KEY,
  DESTINATION_LOCAL_STORGAE_KEY,
  IStore,
  musicProvidersConfig,
  Playlist,
} from "../../utils";

export const setSourceProvider = (payload: any) => {
  localStorage.setItem(SOURCE_LOCAL_STORAGE_KEY, payload.provider);
  return {
    type: types.SET_SOURCE_PROVIDER,
    payload,
  };
};

export const setDestinationProvider = (payload: any) => {
  localStorage.setItem(DESTINATION_LOCAL_STORGAE_KEY, payload.provider);
  return { type: types.SET_DESTINATION_PROVIDER, payload };
};

const addPlaylistToDestination = (payload: Playlist) => ({
  type: types.ADD_PLAYLIST_TO_DESTINATION,
  payload,
});

export const copyPlaylist = (playlistIdFromSource: string) => async (
  dispatch: any,
  getStore: () => IStore
) => {
  const {
    app: { destination },
    destination: { currentUser },
    source: { playlists },
  } = getStore();
  if (!currentUser) return;
  const playlist = playlists.find((pls) => pls.id === playlistIdFromSource);
  if (playlist) {
    dispatch({ type: types.COPY_PLAYLIST, payload: playlist });
    const res = await musicProvidersConfig[destination].createPlaylist(
      playlist,
      currentUser,
      addFailedCopySong(dispatch)
    );
    if (res) {
      dispatch(addPlaylistToDestination(res));
      dispatch(setIsCopyinPlaylist(false));
    }
  }
};

export const closeStatusModal = () => ({
  type: types.CLOSE_STATUS_MODAL,
});

export const setIsCopyinPlaylist = (payload: any) => ({
  type: types.SET_IS_COPYING_PLAYLIST,
  payload,
});

export const addFailedCopySong = (dispatch: any) => (payload: any) =>
  dispatch({
    type: types.ADD_FAILED_SONG_COPY,
    payload,
  });
