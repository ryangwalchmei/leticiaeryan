import Head from "next/head";

import "../scss/globalStyles.scss";
import { MenuProvider } from "../context/menuContext";
import { DataProvider } from "../context/dataContexts";
import { CreateDataProvider } from "../context/createDataContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <MenuProvider>
        <CreateDataProvider>
          <Head>
            <title>Letícia & Ryan - Nosso Casamento</title>
            <meta
              name="description"
              content="Junte-se a nós para celebrar nosso casamento. Encontre informações sobre RSVP, presentes e mais."
            />
            <link rel="icon" href="/images/logo-wb.svg" />
            <meta
              property="og:title"
              content="Letícia & Ryan - Nosso Casamento"
            />
            <meta
              property="og:description"
              content="Detalhes sobre nosso casamento, RSVP e lista de presentes."
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://mannatthemes.com/rizz/default-dark/assets/css/app.min.css"
            ></link>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://mannatthemes.com/rizz/default-dark/assets/css/bootstrap.min.css"
            ></link>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://mannatthemes.com/rizz/default-dark/assets/css/icons.min.css"
            ></link>
            <meta property="og:image" content="/images/seo.png" />
            <meta
              property="og:url"
              content="https://leticiaeryan.gwalchmei.com.br"
            />
            <meta
              property="og:site_name"
              content="Letícia e Ryan - Nosso Casamento"
            />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="Letícia & Ryan - Nosso Casamento"
            />
            <meta
              name="twitter:description"
              content="Venha celebrar conosco! Informações sobre RSVP e presentes disponíveis."
            />
            <meta name="twitter:image" content="/images/seo.png" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            />
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            />
          </Head>
          <Component {...pageProps} />
        </CreateDataProvider>
      </MenuProvider>
    </DataProvider>
  );
}
