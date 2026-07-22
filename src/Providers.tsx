import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./styles.css";

import type { ReactNode } from "react";

import GlobusQueryProvider from "@globus/react-query/provider";
import { info } from "@globus/sdk";

import { version } from "../package.json";

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import SessionManager from "@/components/SessionManager";

const GLOBUS_ENVIRONMENT =
  import.meta.env.VITE_GLOBUS_ENVIRONMENT || "production";
const CLIENT = import.meta.env.VITE_GLOBUS_CLIENT_ID;
const SCOPES = import.meta.env.VITE_GLOBUS_SCOPES;

// @ts-ignore
globalThis.GLOBUS_SDK_ENVIRONMENT = GLOBUS_ENVIRONMENT;

info.addClientInfo({
  product: "@globus/flows-ide",
  version,
});

const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#eff3fb",
      "#dde4ef",
      "#b6c6e1",
      "#8da7d4",
      "#6b8dc9",
      "#557cc3",
      "#4a74c1",
      "#3b63ab",
      "#325799",
      "#214277",
    ],
  },
});

const baseURL = globalThis.location
  ? `${globalThis.location.protocol}//${globalThis.location.host}`
  : "";

/**
 * The OAuth2 redirect URI. `import.meta.env.BASE_URL` reflects Vite's `base`
 * (e.g. `/flows-ide/`), so this resolves to `<origin>/flows-ide/authenticate`.
 */
const REDIRECT = `${baseURL}${import.meta.env.BASE_URL}authenticate`;

export default function Providers({ children }: { children: ReactNode }) {
  if (!CLIENT) {
    throw new Error(
      "Missing VITE_GLOBUS_CLIENT_ID environment variable. Please set it in your .env file.",
    );
  }
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <GlobusQueryProvider
        client={CLIENT}
        redirect={REDIRECT}
        scopes={SCOPES}
        storage={globalThis.sessionStorage}
        environment={GLOBUS_ENVIRONMENT}
      >
        <SessionManager />
        {children}
        <Notifications />
      </GlobusQueryProvider>
    </MantineProvider>
  );
}
