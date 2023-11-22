// // Import styles of packages that you've installed.
// // All packages except `@mantine/hooks` require styles imports

// import type { AppProps } from "next/app";
// import { MantineProvider } from "@mantine/core";
// // import "@mantine/core/styles.css";

// import NavBar from "../components/NavBar";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <html lang="en">
//       <head></head>
//       <body>
//         <NavBar
//           links={[
//             {
//               link: "/",
//               label: "Home",
//             },
//             // {
//             //   link: "/statistics",
//             //   label: "Statistics",
//             // },
//             {
//               link: "/contribute",
//               label: "Contribute",
//             },
//           ]}
//         />
//         <MantineProvider
//           withGlobalStyles
//           withNormalizeCSS
//           theme={{
//             /** Put your mantine theme override here */
//             fontFamily: "system-ui, sans-serif",
//             colorScheme: "light",
//             defaultGradient: {
//               from: "blue",
//               to: "cyan",
//               deg: 90,
//             },
//           }}
//         ></MantineProvider>
//       </body>
//     </html>
//   );
// }

import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "./global.css";
import Layout from "../components/Layout";
import Script from "next/script";
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>CheckTheScam</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <meta
          name="description"
          content="Crowdsourced database of scam messages received."
          key="desc"
        />
        <meta
          property="og:title"
          content="Check The Scam - Is the message you just received a scam?"
        />
        <meta
          property="og:description"
          content="Check The Scam - Is the message you just received a scam?"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-11167200054"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-TP9K44ZC0S');
  `}
      </Script>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          fontFamily: "system-ui, sans-serif",
          colorScheme: "light",
          defaultGradient: {
            from: "blue",
            to: "cyan",
            deg: 90,
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
