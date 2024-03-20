// pages/_app.js
import "../styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra-ui-theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
