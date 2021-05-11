import * as types from "../types";
import {
  SOURCE_LOCAL_STORAGE_KEY,
  DESTINATION_LOCAL_STORGAE_KEY,
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
