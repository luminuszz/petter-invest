import { Head, Html, Main, NextScript } from "next/document";

import { useState } from "react";

export default function Document() {
  const [state, setState] = useState(false);

  console.log({ state });

  return (
    <Html lang="pt-br">
      <Head>
        <meta name="author" content="admin1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
