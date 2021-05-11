import { Action, IDestination } from "../../utils";
import * as types from "../types";

const initialState: IDestination = {
  currentUser: null,
  playlists: [],
  isLoading: false,
  err: null,
};

export const destinationReducer = (
  state = initialState,
  action: Action
): IDestination => {
  switch (action.type) {
    case types.SET_DESTINATION_CURRENT_USER: {
      const { currentUser } = action.payload;
      return { ...state, currentUser };
    }
    case types.SET_DESTINATION_PLAYLISTS: {
      const { playlists } = action.payload;
      return { ...state, playlists, isLoading: false };
    }
    case types.DESTINATION_LOGOUT: {
      return { ...state, playlists: [], currentUser: null };
    }
    case types.GET_DESTINATION_PLAYLISTS: {
      return { ...state, isLoading: true, err: null };
    }
    case types.DESTNATION_REQUEST_ERROR: {
      const { err } = action.payload;
      return { ...state, err, isLoading: false };
    }
    case types.ADD_PLAYLIST_TO_DESTINATION: {
      const playlist = action.payload;
      return {
        ...state,
        playlists: [playlist, ...state.playlists],
      };
    }
    default:
      return state;
  }
};
