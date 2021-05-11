import { Action } from "../../utils/types";
import { musicProvidersConfig, IApp } from "../../utils";

import * as types from "../types";

const initialState: IApp = {
  musicProviders: Object.keys(musicProvidersConfig),
  source: "",
  destination: "",
};

export const appReducer = (state = initialState, action: Action): IApp => {
  switch (action.type) {
    case types.SET_DESTINATION_PROVIDER: {
      const { provider: destination } = action.payload;
      return { ...state, destination };
    }
    case types.SET_SOURCE_PROVIDER: {
      const { provider: source } = action.payload;
      return { ...state, source };
    }
    default:
      return state;
  }
};
