import { Applemusic } from "@styled-icons/simple-icons/";
import { Playlist, User, Song, cleanStringFromSpecialChar } from "../utils";

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

//  ###############################################

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

export const createPlaylist = async (
  playlist: Playlist,
  { token }: User,
  addFailedCopySong: (payload: Song) => Song
) => {
  // @ts-ignore
  const music = MusicKit.getInstance();

  const tracks = await Promise.all(
    playlist.songs.map(async (song) => {
      const res = await music.api.search(
        cleanStringFromSpecialChar(`${song.artist} ${song.name}`),
        {
          types: ["songs"],
          limit: 24,
        }
      );

      console.log(res.songs);
      if (!res.songs) {
        addFailedCopySong(song);
        return;
      }

      const {
        data: [track],
      } = res?.songs;

      if (track) {
        return {
          id: track.id,
          type: track.type,
        };
      }
    })
  );

  const fetchBody = {
    attributes: {
      name: playlist.title,
      description: "",
    },
    relationships: {
      tracks: {
        data: tracks.filter(Boolean),
      },
    },
  };

  const res: any = await fetch(API_URL, {
    headers: {
      "Music-User-Token": token,
      Authorization: `Bearer ${music.developerToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fetchBody),
    method: "POST",
  });

  const {
    data: [playlistRawData],
  } = await res.json();

  const parsedPlaylist = await parsePlaylist(playlistRawData);

  return parsedPlaylist;
};

export const searchURI = (resource: string) =>
  `https://music.apple.com/us/search?term=${resource}`;
