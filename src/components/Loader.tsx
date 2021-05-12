import LoaderSpinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

type LoaderType = {
  color?: string;
  type?:
    | "Bars"
    | "Audio"
    | "BallTriangle"
    | "Circles"
    | "Grid"
    | "Hearts"
    | "Oval"
    | "Puff"
    | "Rings"
    | "TailSpin"
    | "ThreeDots"
    | "Watch"
    | "RevolvingDot"
    | "Triangle"
    | "Plane"
    | "MutatingDots"
    | "CradleLoader";
};

const Loader = ({ color, type }: LoaderType) => {
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
      <LoaderSpinner
        type={type || "Bars"}
        height={100}
        width={100}
        color={color || "inherit"}
      />
    </div>
  );
};

export default Loader;
