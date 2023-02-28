import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/syne";
import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { tooltipTheme } from "components/Tooltip";
import Layout from "components/Layout";



function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    components: {
      Tooltip: tooltipTheme,
    },
  });

  return (
    <>
      <Head>
        <title> AI 🤝🏻 Puddle </title>

        <link rel="shortcut icon" href="favicon.png" />

        <meta
          name="viewport"
          key="main"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="title"
          content="AI 🤝🏻 Puddle — imagining to minting made possible on Puddle"
        />
        <meta
          name="description"
          content="imagining to minting made possible on Puddle"
        />

        <meta property="og:type" content="website" key="og-type" />

        <meta
          property="og:title"
          content="AI Mint x Puddle — imagination comes to flow"
          key="og-title"
        />
        <meta
          property="og:description"
          content="AI 🤝🏻 Puddle — imagining to minting made possible on Puddle"
          key="og-desc"
        />



      </Head>
      <div>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-SC89JTD45T"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SC89JTD45T');
        `}
        </Script>
      </div>

      <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
