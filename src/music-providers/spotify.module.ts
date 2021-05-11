import { SpotifyWithCircle } from "@styled-icons/entypo-social";

const AUTHORIZE_URI = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = `${window.location.origin}/spotify-interceptor`;

const SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
].join("%20");

export const layout = {
  style: {
    background:
      "linear-gradient(180deg, rgba(57,215,95,1) 0%, rgba(57,215,164,1) 100%)",
    color: "white",
    fontFamily: "",
  },
  logo: SpotifyWithCircle,
  displayName: "Spotify",
};

export const login = async () => {
  //POPUP WINDOW DIMENSIONS
  const width = 700;
  const height = 600;
  const right = window.screen.availWidth / 2 - 600 / 2;
  const top = window.screen.availHeight / 2 - 600 / 2;
  //
  return new Promise((resolve) => {
    const handleHashToken = (e: any) => {
      if (typeof e.data === "string" && e.data.startsWith("#access_token")) {
        window.removeEventListener("message", handleHashToken);
        const token = e.data.substr(1).split("&")[0].split("=")[1];
        resolve(token);
      }
    };
    const popup = window?.open(
      `${AUTHORIZE_URI}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&show_dialog=true`,
      "Spotify Login",
      `width=${width},height=${height},right=${right},top=${top}`
    );
    window.addEventListener("message", handleHashToken);

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        window.removeEventListener("message", handleHashToken);
      }
    }, 1000);
  });
};

export const logout = () => {};

export const getPlaylists = async ({}) => {
  return [];
};

export const search = () => {};

export const createPlaylist = () => {};

const addSongToPlaylist = () => {};
