import Navbar from "../../components/navbar/navbar";
import WpoPageTitle from "../../components/wpoPageTitle";
import { FaGift } from "react-icons/fa";
import useSWR from "swr";

async function fetchAPI(endpoint) {
  const response = await fetch(endpoint);
  const responseBody = await response.json();
  return responseBody;
}

export default function Gifts() {
  const config = {
    showPrices: false,
  };

  const { isLoading, data: giftsList } = useSWR("/api/v1/gifts", fetchAPI);

  return (
    <>
      <Navbar />
      <WpoPageTitle title={"Lista de Presentes"} />
      <section className="wpo-shop-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <section className="wpo-product-section section-padding">
                <div className="container">
                  <div className="wpo-product-wrap">
                    <div className="row">
                      {(isLoading || !giftsList) && (
                        <div className="col-lg-12">
                          <div className="wpo-product-item">
                            <h3>Não há presentes disponíveis no momento.</h3>
                          </div>
                        </div>
                      )}

                      {giftsList
                        ?.filter((product) => product.ext)
                        .filter((product) => product.available)
                        .filter((product) => !product.received)
                        .map((product) => (
                          <div
                            key={product.id}
                            style={{ marginRight: "3.2rem" }} // Adiciona margem direita de 20px
                            className="col-xl-3 col-lg-6 col-md-6 col-12 "
                          >
                            <div className="wpo-product-item">
                              <div
                                className="wpo-product-img"
                                style={{
                                  width: "325px",
                                  height: "400px",
                                  position: "relative",
                                  overflow: "hidden",
                                  margin: "0 auto", // Centraliza a imagem no card
                                }}
                              >
                                {/*  eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={
                                    product.link.startsWith("/images/gifts")
                                      ? `${product.link}${product.ext}`
                                      : product.link
                                  }
                                  alt={product.alt}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                                <ul>
                                  <li>
                                    <button
                                      data-bs-toggle="tooltip"
                                      data-bs-html="true"
                                      title="Add to Wishlist"
                                    >
                                      <FaGift />
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      data-bs-toggle="tooltip"
                                      data-bs-html="true"
                                      title="Indicar inteção de presente"
                                      onClick={() => {
                                        window.open(
                                          `https://api.whatsapp.com/send?phone=5591984546411&text=Oi, gostaria de registrar minha intenção de presentear *${product.title}* para o seu casamento.`,
                                        );
                                      }}
                                    >
                                      Presentear
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="wpo-product-text">
                                <h3>{product.title}</h3>
                                {config.showPrices && (
                                  <ul>
                                    <li></li>
                                    <li>
                                      {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      }).format(product.price)}
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
