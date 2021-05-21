import { Action, ISource } from "../../utils"
import * as types from "../types"

const initialState: ISource = {
   currentUser: null,
   playlists: [],
   isLoading: false,
   err: null
}

export const sourceRedcuer = (
   state = initialState,
   action: Action
): ISource => {
   switch (action.type) {
      case types.SET_SOURCE_CURRENT_USER: {
         const { currentUser } = action.payload
         return { ...state, currentUser }
      }
      case types.SET_SOURCE_PLAYLISTS: {
         const { playlists } = action.payload
         return { ...state, playlists, isLoading: false }
      }
      case types.SOURCE_LOGOUT: {
         return { ...state, playlists: [], currentUser: null }
      }
      case types.GET_SOURCE_PLAYLISTS: {
         return { ...state, isLoading: true, err: null }
      }
      case types.SOURCE_REQUEST_ERROR: {
         const { err } = action.payload
         return { ...state, isLoading: false, err }
      }
      default:
         return state
   }
}
