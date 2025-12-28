/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import "styles/globalStyles.scss";
import { MenuProvider } from "contexts/menuContext";
import { GetDataProvider } from "contexts/getDataContext";
import { CreateDataProvider } from "contexts/createDataContext";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
import { NotificationsProvider } from "contexts/notificationsContext";
import { UserProvider } from "contexts/userContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <UserProvider>
        <NotificationsProvider>
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
                  <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
                    crossorigin="anonymous"
                  />

                  <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
                    crossorigin="anonymous"
                  ></script>
                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                  />
                  <link
                    rel="stylesheet"
                    type="text/css"
                    charset="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                  />
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                  />
                </Head>
                <Component {...pageProps} />
              </CreateDataProvider>
            </MenuProvider>
          </GetDataProvider>
        </NotificationsProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
