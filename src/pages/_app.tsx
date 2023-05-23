import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";


import "../styles/discourse.css";
const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    mono: "Roboto Mono, monospace",
    heading: "Roboto, sans-serif",
  },

  components: {
    Heading: {
      color: "gray.300",
    },
    Text: {
      color: "gray.300",
    },
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
  config: {
    initialColorMode: "dark",
  },
});

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
