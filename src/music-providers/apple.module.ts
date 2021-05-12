import { Applemusic } from "@styled-icons/simple-icons/";
import { Playlist, User } from "../utils";

const API_URL = "https://api.music.apple.com/v1/me/library/playlists";
const APPLEMUSIC_LOGO = `https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/600x600bb.jpeg`;

export const initAppleMusicKit = () => {
  document.addEventListener("musickitloaded", function () {
    //@ts-ignore
    MusicKit.configure({
      developerToken: process.env.REACT_APP_APPLE_DEVELOPER_TOKEN,
      app: {
        name: "Playswish.co",
        build: "1.0beta1",
        version: "1.0beta1",
      },
    });
  });
};

export const layout = {
  style: {
    background:
      "linear-gradient(180deg, rgba(234,66,73,1) 0%, rgba(217,62,82,1) 100%)",
    color: "white",
    fontFamily: "",
  },
  displayName: "Apple Music",
  logo: Applemusic,
};

export const login = async (): Promise<User> => {
  //@ts-ignore
  const music = MusicKit.getInstance();
  const token = await music.authorize();

  return { token, id: "" };
};

export const logout = () => {
  //@ts-ignore
  const music = MusicKit.getInstance();
  music.unauthorize();
};

export const getPlaylists = async ({ token }: User): Promise<Playlist[]> => {
  //@ts-ignore
  const music = MusicKit ? MusicKit.getInstance() : "";
  const res: any = await fetch(API_URL, {
    headers: {
      "Music-User-Token": token,
      Authorization: `Bearer ${music.developerToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();
  return await Promise.all(
    data.map(async (pls: any) => await parsePlaylist(pls))
  );
};

const handleMediaItem = (payload: {
  url: string;
  height: number;
  width: number;
}) => {
  const { url, height, width } = payload;
  if (!url) return APPLEMUSIC_LOGO;
  let newString = url.replace("{h}", `${height}`);
  newString = newString.replace("{w}", `${width}`);
  return newString;
};

const parsePlaylist = async (playlist: any): Promise<Playlist> => {
  //@ts-ignore
  const music = MusicKit.getInstance();

  const { name: title } = playlist.attributes;
  const { id } = playlist;

  const pls = await (id.startsWith("p.")
    ? music.api.library.playlist(id)
    : music.api.playlist(id));

  const songs = pls.relationships.tracks.data.map(
    ({ attributes, id }: any) => ({
      artist: attributes.artistName,
      name: attributes.name,
      id,
      image: handleMediaItem(attributes.artwork),
      duration: attributes.durationInMillis,
    })
  );
  return {
    title,
    songs,
    id,
    image: handleMediaItem({ url: "", height: 0, width: 0 }),
  };
};

export const createPlaylist = async (playlist: Playlist, currentUser: User) => {
  console.log(playlist);
  return "";
};
