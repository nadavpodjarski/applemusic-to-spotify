import { useEffect } from "react";

import "./App.css";
import { useSelector } from "react-redux";
import Source from "./containers/Source";
import Destination from "./containers/Destination";
import StatusModal from "./components/StatusModal";

import { Divider, makeStyles } from "@material-ui/core";
import { initAppleMusicKit } from "./music-providers/apple.module";

const useStyles = makeStyles((theme) => ({
  divider: {
    alignSelf: "stretch",
    height: "100%",
    width: 8,
    boxShadow: theme.shadows[3],
    background: theme.palette.background.paper,
  },
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    initAppleMusicKit();
  }, []);

  return (
    <>
      <div className="App">
        <Source />
        <Divider orientation="vertical" className={classes.divider} />
        <Destination />
        <StatusModal />
      </div>
    </>
  );
}

export default App;
