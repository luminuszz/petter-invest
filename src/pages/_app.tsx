import "@/styles/globals.css";
import { ChakraProvider, ChakraTheme, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
} as ChakraTheme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
