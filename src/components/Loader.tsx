import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
