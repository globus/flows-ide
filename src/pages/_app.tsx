import "../styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as GlobusAuthProvider } from "@globus/react-auth-context";

import theme from "../chakra-ui-theme";
import { FlowDefinitionProvider } from "@/components/FlowDefinitionProvider/FlowDefinitionProvider";

const CLIENT = "91847941-14e5-4dcd-acf9-63f53741def8";

const SCOPES =
  "https://auth.globus.org/scopes/eec9b274-0c81-4334-bdc2-54e90e689b9a/manage_flows";

const baseURL = globalThis.location
  ? `${globalThis.location.protocol}//${globalThis.location.host}`
  : "";
const REDIRECT = `${baseURL}/flows-ide/authenticate`;

function FlowsIDE({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <GlobusAuthProvider client={CLIENT} redirect={REDIRECT} scopes={SCOPES}>
        <FlowDefinitionProvider>
          <Component {...pageProps} />
        </FlowDefinitionProvider>
      </GlobusAuthProvider>
    </ChakraProvider>
  );
}

export default FlowsIDE;
