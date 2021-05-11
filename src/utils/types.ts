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

export type User = {
  token: string;
  id: string;
};

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
  description?: string;
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
  login: () => Promise<User>;
  logout: () => void;
  getPlaylists: (currentUser: User) => Promise<Array<Playlist>>;
  createPlaylist: (playlist: Playlist, currentUser: User) => Promise<any>;
}
