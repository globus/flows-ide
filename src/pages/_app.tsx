import "../styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as GlobusAuthProvider } from "@globus/react-auth-context";
import { info } from "@globus/sdk";

import { version } from "../../package.json" assert { type: "json" };

import theme from "../chakra-ui-theme";

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
    <ChakraProvider theme={theme}>
      <GlobusAuthProvider
        client={CLIENT}
        redirect={REDIRECT}
        scopes={SCOPES}
        storage={globalThis.sessionStorage}
        environment={GLOBUS_ENVIRONMENT}
      >
        <SessionManager />
        <Component {...pageProps} />
      </GlobusAuthProvider>
    </ChakraProvider>
  );
}

export default FlowsIDE;
