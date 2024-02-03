// pages/_app.js
import "../styles.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
