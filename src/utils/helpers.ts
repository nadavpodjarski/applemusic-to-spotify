import { musicProvidersConfig } from "./";

const defaultLayout = {
  style: {
    background: "",
    color: "",
    fontFamily: "",
  },
  displayName: "",
  logo: "",
};

export const getProviderLayout = ({ provider }: { [key: string]: string }) =>
  musicProvidersConfig[provider]?.layout || defaultLayout;

export const cleanStringFromSpecialChar = (str: string) =>
  // eslint-disable-next-line
  str.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/gi, " ");

export const convertMilliseconds = (
  duration: number,
  literal: boolean = false
) => {
  const addZero = (time: number) => (time < 10 ? "0" + time : time);

  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor(duration / (1000 * 60)) % 60;
  const seconds = Math.floor(duration / 1000) % 60;

  if (literal) {
    return `${hours ? `${hours} hours ` : ""}${
      minutes ? `${minutes} min ` : ""
    }${seconds ? `${seconds} seconds` : ""}`;
  }
  return `${hours ? addZero(hours) + ":" : ""}${
    minutes ? addZero(minutes) + ":" : ""
  }${addZero(seconds)}`;
};
