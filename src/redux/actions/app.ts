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

  const playlist = playlists.find((pls) => pls.id === playlistIdFromSource);
  if (playlist) {
    dispatch({ type: types.COPY_PLAYLIST });
    const res = await musicProvidersConfig[destination].createPlaylist(
      playlist,
      currentUser
    );
    res && dispatch(addPlaylistToDestination(res));
  }
};
