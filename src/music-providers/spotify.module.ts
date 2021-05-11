import { SpotifyWithCircle } from "@styled-icons/entypo-social";
import { User, Playlist } from "../utils";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyWebApi = new SpotifyWebApi();

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
        const data = await spotifyWebApi.getMe();
        const { id } = data;
        resolve({ id, token });
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

const getPlaylistSongs = async (id: string) => {
  const songs = await spotifyWebApi.getPlaylistTracks(id);
  return songs.items.map(({ track }: any) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
  }));
};

export const getPlaylists = async ({ id }: User): Promise<Playlist[]> => {
  const data = await spotifyWebApi.getUserPlaylists(id);
  return await Promise.all(
    data.items.map(async ({ id, name }: any) => ({
      id,
      title: name,
      songs: await getPlaylistSongs(id),
    }))
  );
};

export const logout = () => {};

export const search = () => {};

export const createPlaylist = async (playlist: Playlist, id?: string) => {
  if (id) {
    // const newPlaylist = await spotifyWebApi.createPlaylist(id, {
    //   name: playlist.title,
    //   public: false,
    //   description: "",
    // });

    playlist.songs.forEach((song) => {
      const newTrack = spotifyWebApi.searchTracks(
        `${song.artist} ${song.name}`
      );
      console.log(newTrack);
    });
  }
};

const addSongToPlaylist = () => {};
