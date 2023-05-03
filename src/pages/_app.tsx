import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

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
