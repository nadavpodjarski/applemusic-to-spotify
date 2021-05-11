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
