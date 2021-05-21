import { Action } from "../../utils/types"
import { IStatus } from "../../utils"

import * as types from "../types"

const initialState: IStatus = {
   isCopying: false,
   isStatusModalOpen: false,
   playlistToCopy: null,
   failedCopySongs: []
}

export const statusReducer = (state = initialState, action: Action) => {
   switch (action.type) {
      case types.COPY_PLAYLIST: {
         return {
            ...state,
            isCopying: true,
            isStatusModalOpen: true,
            playlistToCopy: action.payload
         }
      }
      case types.CLOSE_STATUS_MODAL: {
         return {
            ...state,
            isStatusModalOpen: false,
            playlistToCopy: null,
            failedCopySongs: []
         }
      }
      case types.SET_IS_COPYING_PLAYLIST: {
         return { ...state, isCopying: action.payload }
      }
      case types.ADD_FAILED_COPY_SONG: {
         return {
            ...state,
            failedCopySongs: [...state.failedCopySongs, action.payload]
         }
      }
      default:
         return state
   }
}
