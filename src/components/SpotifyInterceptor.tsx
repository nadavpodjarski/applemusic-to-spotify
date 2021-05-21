const SpotifyInterceptor = () => {
  if (
    window.location.hash &&
    window.location.hash.startsWith("#access_token")
  ) {
    window.opener.postMessage(window.location.hash, window.location);
    window.close();
  }

  return <div></div>;
};

export default SpotifyInterceptor;
