import { SpotifyWithCircle } from "@styled-icons/entypo-social";
import { User, Playlist, cleanStringFromSpecialChar } from "../utils";

import SpotifyWebApi from "spotify-web-api-js";

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

const REDIRECT_URI = `${window.location.origin}/spotify-interceptor`;
const AUTHORIZE_URI = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&show_dialog=true`;

const spotifyWebApi = new SpotifyWebApi();

const parsePlaylist = async ({ id, name: title, images }: any) => ({
  id,
  title,
  songs: await parsePlaylistSongs(id),
  image: images[0].url,
});

const parsePlaylistSongs = async (id: string) => {
  const songs = await spotifyWebApi.getPlaylistTracks(id);
  return songs.items.map(
    ({ track: { name, id, artists, album, duration_ms: duration } }: any) => ({
      id,
      name,
      duration,
      artist: artists[0].name,
      image: album.images[0].url,
    })
  );
};

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

export const login = async (): Promise<User> => {
  //POPUP WINDOW DIMENSIONS
  const width = 700;
  const height = 600;
  const right = window.screen.availWidth / 2 - 600 / 2;
  const top = window.screen.availHeight / 2 - 600 / 2;
  //
  return new Promise((resolve) => {
    const handleHashToken = async (e: any) => {
      if (typeof e.data === "string" && e.data.startsWith("#access_token")) {
        window.removeEventListener("message", handleHashToken);
        const token = e.data.substr(1).split("&")[0].split("=")[1];
        spotifyWebApi.setAccessToken(token);
        const { id } = await spotifyWebApi.getMe();
        resolve({ id, token });
      }
    };
    const popup = window?.open(
      AUTHORIZE_URI,
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

export const getPlaylists = async ({ id }: User): Promise<Playlist[]> => {
  const data = await spotifyWebApi.getUserPlaylists(id);
  return await Promise.all(
    data.items.map(async (playlist) => await parsePlaylist(playlist))
  );
};

export const createPlaylist = async (
  playlist: Playlist,
  { id }: User,
  addFailedCopySong: (payload: any) => (dispatch: any) => any
): Promise<Playlist> => {
  const newPlaylist = await spotifyWebApi.createPlaylist(id, {
    name: playlist.title,
    public: true,
    description: "",
  });

  const trackuris = await Promise.all(
    playlist.songs.map(async (song) => {
      const {
        tracks: { items },
      } = await spotifyWebApi.searchTracks(
        `${cleanStringFromSpecialChar(
          song.artist
        )} ${cleanStringFromSpecialChar(song.name)}`
      );

      if (!items[0]?.uri) addFailedCopySong(song);
      return items[0]?.uri;
    })
  );

  await spotifyWebApi.addTracksToPlaylist(
    newPlaylist.id,
    trackuris.filter(Boolean)
  );

  const res = await spotifyWebApi.getPlaylist(newPlaylist.id);
  return parsePlaylist(res);
};

export const logout = () => {};
