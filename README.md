# Playswish.co

#### Switch between music providers can be painfull proccess, This project aims to help ppl move their playlists from one music provider to another.

## Getting started

1. Copy repo to your local machine <br/>
   use the following command `git clone https://github.com/nadavpodjarski/applemusic-to-spotify your_project`
2. Create .env file in your project directory and add <br/>
   `REACT_APP_APPLE_DEVELOPER_TOKEN=your apple music developer token` <br/>
   `REACT_APP_SPOTIFY_CLIENT_ID=your spotify client id`
3. cd your_project and install all dependencies
   use the following command `cd your_projetc && npm i`
4. Ctart project using following command `npm start`

## Adding Music Provider

To add more music provider simply follow the next steps

1. add new file for the new music provdier at `src/music-providers/your_file.module.ts`
2. implement and export IMusicProvider interface that can be found at src/utils/types in your new file.
3. export your new file from src/music-providers/index <br/> I.E `export * as music_provider from './your/your_file.module'`
4. Your good to go !

## Enjoy !
