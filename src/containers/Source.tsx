import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles, useTheme } from "@material-ui/core"

import LoginForm from "./LoginForm"
import Appbar from "../components/Appbar"
import Playlist from "../components/Playlist"
import Loader from "../components/Loader"
import Title from "../components/Title"

import { getProviderLayout } from "../utils"
import * as actions from "../redux/actions"

const useStyles = makeStyles(theme => ({
   root: {
      display: "grid",
      gridTemplateRows: "auto auto 1fr",
      overflow: "hidden",
      background: theme.palette.background.default
   },
   body: {
      overflowY: "auto",
      padding: theme.spacing(2),
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(2)
   }
}))

const Source = () => {
   const classes = useStyles()
   const dispatch = useDispatch()
   const theme = useTheme()

   const { currentUser, playlists, isLoading } = useSelector(
      state => state.source
   )

   const {
      destination,
      musicProviders,
      source: self
   } = useSelector(state => state.app)

   const layout = useMemo(() => getProviderLayout({ provider: self }), [self])

   const loginHandler = (provider: string) => async () =>
      dispatch(actions.sourceLogin({ provider }))

   const logoutHandler = async () =>
      dispatch(actions.sourceLogout({ provider: self }))

   const copyPlaylistHandler = (id: string) =>
      dispatch(actions.copyPlaylist(id))

   const relevantMusicProviders = () =>
      musicProviders.filter(provider => provider !== destination)

   return (
      <div className={classes.root}>
         <Appbar title="" logout={logoutHandler} isLoggedIn={!!currentUser} />
         <Title {...{ ...layout, side: "Source" }} />
         {currentUser && self ? (
            <>
               <div className={classes.body}>
                  {isLoading ? (
                     <Loader color={theme.palette.text.secondary} />
                  ) : (
                     playlists?.map(playlist => (
                        <Playlist
                           {...{
                              ...playlist,
                              onCopy: copyPlaylistHandler
                           }}
                           key={playlist.id}
                        />
                     ))
                  )}
               </div>
            </>
         ) : (
            <LoginForm
               relevantProviders={relevantMusicProviders()}
               loginHandler={loginHandler}
            />
         )}
      </div>
   )
}

export default Source
