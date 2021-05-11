import { musicProvidersConfig } from "./";

export const getProviderStyle = ({ provider }: { [key: string]: string }) =>
  provider && musicProvidersConfig[provider]?.layout.style;
