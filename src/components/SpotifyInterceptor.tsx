const SpotifyInterceptor = () => {
   if (
      window.location.hash &&
      window.location.hash.startsWith("#access_token")
   ) {
      window.opener.postMessage(window.location.hash, window.location)
      setTimeout(() => {
         window.close()
      }, 800)
   }

   return <div></div>
}

export default SpotifyInterceptor
