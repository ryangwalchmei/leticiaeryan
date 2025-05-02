import Head from "next/head";
import "../scss/globalStyles.scss";
import { MenuProvider } from "contexts/menuContext";
import { GetDataProvider } from "contexts/getDataContext";
import { CreateDataProvider } from "contexts/createDataContext";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <GetDataProvider>
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
            </Head>
            <Component {...pageProps} />
          </CreateDataProvider>
        </MenuProvider>
      </GetDataProvider>
    </ErrorBoundary>
  );
}
