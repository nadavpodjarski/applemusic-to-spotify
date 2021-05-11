export type Action = {
  payload: any;
  type: string;
};

export interface IApp {
  musicProviders: string[];
  source: string;
  destination: string;
}

export interface ISource {
  currentUser: any;
  playlists: Playlist[];
  isLoading: boolean;
  err: any;
}

export interface IDestination {
  currentUser: any;
  playlists: Playlist[];
  isLoading: boolean;
  err: any;
}

export interface IStore {
  app: IApp;
  source: ISource;
  destination: IDestination;
}

type Song = {
  artist: string;
  name: string;
  id: string;
  image?: string;
};

export type Playlist = {
  id: string;
  title: string;
  songs: Array<Song>;
};

export interface IMusicProvider {
  layout: {
    style: {
      background: string;
      color: string;
      fontFamily?: string;
    };
    displayName: string;
    logo: any;
  };
  login: () => {};
  logout: () => void;
  getPlaylists: () => Promise<Array<Playlist>>;
  createPlaylist?: () => any;
  search?: () => any;
}
