import "../styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Provider as GlobusAuthProvider } from "@globus/react-auth-context";
import { info } from "@globus/sdk";

import { version } from "../../package.json" assert { type: "json" };

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import SessionManager from "@/components/SessionManager";

import type { AppProps } from "next/app";

const GLOBUS_ENVIRONMENT =
  process.env.NEXT_PUBLIC_GLOBUS_ENVIRONMENT || "production";
const CLIENT = process.env.NEXT_PUBLIC_GLOBUS_CLIENT_ID;
const SCOPES = process.env.NEXT_PUBLIC_GLOBUS_SCOPES;

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
      "#f5f9fd",
      "#cddaeb",
      "#94c9fb",
      "#1e70b9",
      "#335b96",
      "#244b8b",
      "#214277",
      "#273866",
      "#273866",
      "#273866",
      "#273866",
    ],
  },
});

const baseURL = globalThis.location
  ? `${globalThis.location.protocol}//${globalThis.location.host}`
  : "";

const REDIRECT = `${baseURL}/flows-ide/authenticate`;

function FlowsIDE({ Component, pageProps }: AppProps) {
  if (!CLIENT) {
    throw new Error(
      "Missing GLOBUS_CLIENT_ID environment variable. Please set it in your .env file.",
    );
  }
  return (
    <MantineProvider theme={theme}>
      <GlobusAuthProvider
        client={CLIENT}
        redirect={REDIRECT}
        scopes={SCOPES}
        storage={globalThis.sessionStorage}
        environment={GLOBUS_ENVIRONMENT}
      >
        <SessionManager />
        <Component {...pageProps} />
        <Notifications />
      </GlobusAuthProvider>
    </MantineProvider>
  );
}

export default FlowsIDE;
