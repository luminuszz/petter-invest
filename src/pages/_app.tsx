import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    mono: "Roboto Mono, monospace",
    heading: "Roboto, sans-serif",
  },

  styles: {
    global: {
      body: {
        backgroundColor: "gray.900",
      },
    },
  },

  colors: {
    gray: {
      900: "#3D4048",
      800: "#323337",
      300: "#D8DADB",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
