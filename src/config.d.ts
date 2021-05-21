import { IStore } from "./utils"

declare module "react-redux" {
   interface DefaultRootState extends IStore {}
}
