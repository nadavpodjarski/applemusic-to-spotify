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
  str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/gi, " ");
