// pages/_app.js
import "../styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra-ui-theme";
import { FlowDefinitionProvider } from "@/components/FlowDefinitionProvider/FlowDefinitionProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <FlowDefinitionProvider>
        <Component {...pageProps} />
      </FlowDefinitionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
