import * as musicProviders from "../music-providers"

import { IMusicProvider } from "./types"

export const musicProvidersConfig: { [key: string]: IMusicProvider } = {
   ...musicProviders
}
