import { CircularProgress } from "@material-ui/core";

type LoaderType = {
  color?: string;
};

const Loader = ({ color }: LoaderType) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: color || "black",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
