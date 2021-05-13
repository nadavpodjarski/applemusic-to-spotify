export type Action = {
  payload: any;
  type: string;
};

export interface IApp {
  musicProviders: string[];
  source: string;
  destination: string;
}

export interface IStatus {
  isCopying: boolean;
  isStatusModalOpen: boolean;
  playlistToCopy: Playlist | null;
  failedCopySongs: Array<Song>;
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
  status: IStatus;
}

export type User = {
  token: string;
  id: string;
};

export type Song = {
  artist: string;
  name: string;
  id: string;
  image?: string;
  duration?: number;
};

export type Playlist = {
  id: string;
  title: string;
  songs: Array<Song>;
  description?: string;
  image?: any;
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
  createPlaylist: (
    playlist: Playlist,
    currentUser: User,
    addFailedSong: (payload: Song) => Song
  ) => Promise<any>;
  fialedSearchRedirectUri: (uri: string) => string;
}
