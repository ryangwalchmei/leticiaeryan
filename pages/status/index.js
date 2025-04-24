import useSWR from "swr";

async function fetchAPI(endpoint) {
  const response = await fetch(endpoint);
  const responseBody = await response.json();
  return responseBody;
}

export default function Status() {
  return (
    <>
      <div className="section1 static-hero-s2">
        <div className="hero-container">
          <div className="hero-inner" style={{ flexDirection: "column" }}>
            <section
              className="wpo-about-section section-padding"
              style={{ padding: "0px" }}
            >
              <div className="container">
                <div class="row justify-content-center">
                  <div class="col-xl-8 col-lg- col-md-10 col-12">
                    <div class="wpo-section-title">
                      <h2>Página de Status da Aplicação </h2>
                      <UpdatedAt />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Dependencies />
          </div>
        </div>
      </div>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";
  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return <span>Última atualização: {UpdatedAtText}</span>;
}

function Dependencies() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <div>Carregando dependências...</div>;
  }

  const { database } = data.dependencies;

  return (
    <>
      <section className="wpo-portfolio-single-section ">
        <div className="container">
          <div className="portfolio-single-wrap">
            <div className="row">
              <div className="col-lg-7 col-12">
                <div className="portfolio-single-sitebar">
                  <div className="portfolio-single-text">
                    <h2>Banco de dados</h2>
                    <div className="wpo-portfolio-single-content-des">
                      <ul>
                        <li>
                          Versão :<span>{database.version}</span>{" "}
                        </li>
                        <li>
                          Máximo de Conexões :
                          <span>{database.max_connections}</span>
                        </li>
                        <li>
                          Conexões Abertas :
                          <span>{database.opened_connections}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-12 invisible">
                <div className="portfolio-single-sitebar">
                  <div className="portfolio-single-text">
                    <h2>Marriage For Life</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Metus dis posuere amet tincidunt commodo, velit. Ipsum,
                      hac nibh fermentum nisi, platea condimentum cursus velit
                      dui. Massa volutpat odio facilisis purus sit elementum.
                      Non, sed velit dictum quam.
                    </p>
                    <div className="wpo-portfolio-single-content-des">
                      <ul>
                        <li>
                          Location :<span>3724 Linda Street, London</span>{" "}
                        </li>
                        <li>
                          Client :<span>James &amp; Amelia</span>
                        </li>
                        <li>
                          Photographer :<span>Harry Johnson</span>
                        </li>
                        <li>
                          Project Type :<span>Photography</span>
                        </li>
                        <li>
                          Duration : <span>6 Month</span>
                        </li>
                        <li>
                          Tag :<span>Wedding, Planner, Bride, GItem</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
