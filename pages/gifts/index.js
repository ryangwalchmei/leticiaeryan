import { Navbar } from "components/navbar/navbar";
import WpoPageTitle from "components/wpoPageTitle";
import Image from "next/image";
import { FaGift } from "react-icons/fa";

const listGifts = [
  {
    id: 1,
    ext: ".jpg",
    alt: "Cadeira de escritório",
    link: "/product-single/Cadeira-de-escritorio",
    title: "Cadeira de escritório",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 2,
    ext: ".jpg",
    alt: "Cama box king",
    link: "/product-single/Cama-box-king",
    title: "Cama box king",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 3,
    ext: ".jpg",
    alt: "Banquetas",
    link: "/product-single/Banquetas",
    title: "Banquetas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 4,
    ext: ".jpg",
    alt: "Tábua de passar roupa",
    link: "/product-single/Tabua-de-passar-roupa",
    title: "Tábua de passar roupa",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 5,
    ext: ".jpg",
    alt: "Escada",
    link: "/product-single/Escada",
    title: "Escada",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 6,
    ext: ".webp",
    alt: "Tábua de frios",
    link: "/product-single/Tabua-de-frios",
    title: "Tábua de frios",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 7,
    ext: ".webp",
    alt: "Torradeira",
    link: "/product-single/Torradeira",
    title: "Torradeira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 8,
    ext: ".jpg",
    alt: "Mixer 3 em 1",
    link: "/product-single/Mixer-3-em-1",
    title: "Mixer 3 em 1",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 9,
    ext: ".webp",
    alt: "Frigobar",
    link: "/product-single/Frigobar",
    title: "Frigobar",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 10,
    ext: ".jpg",
    alt: "Tigelas",
    link: "/product-single/Tigelas",
    title: "Tigelas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 11,
    ext: ".webp",
    alt: "Formas de bolo variadas",
    link: "/product-single/Formas-de-bolo-variadas",
    title: "Formas de bolo variadas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 12,
    ext: ".webp",
    alt: "Panela de pressão elétrica",
    link: "/product-single/Panela-de-pressao-eletrica",
    title: "Panela de pressão elétrica",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 13,
    ext: ".webp",
    alt: "Jogo de jantar",
    link: "/product-single/Jogo-de-jantar",
    title: "Jogo de jantar",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 14,
    ext: ".jpg",
    alt: "Jogo de panela",
    link: "/product-single/Jogo-de-panela",
    title: "Jogo de panela",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 15,
    ext: ".webp",
    alt: "Jogo de xícaras",
    link: "/product-single/Jogo-de-xicaras",
    title: "Jogo de xícaras",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 16,
    ext: ".webp",
    alt: "Jogo de jarras",
    link: "/product-single/Jogo-de-jarras",
    title: "Jogo de jarras",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 17,
    ext: ".webp",
    alt: "Jogos de copos",
    link: "/product-single/Jogos-de-copos",
    title: "Jogos de copos",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 18,
    ext: ".jpg",
    alt: "Refratários",
    link: "/product-single/Refratarios",
    title: "Refratários",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 19,
    ext: ".jpg",
    alt: "Formas de cozinha",
    link: "/product-single/Formas-de-cozinha",
    title: "Formas de cozinha",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 20,
    ext: ".webp",
    alt: "Faqueiro",
    link: "/product-single/Faqueiro",
    title: "Faqueiro",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 21,
    ext: ".webp",
    alt: "Jogo marinex",
    link: "/product-single/Jogo-marinex",
    title: "Jogo marinex",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 22,
    ext: ".jpg",
    alt: "Talheres",
    link: "/product-single/Talheres",
    title: "Talheres",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 23,
    ext: ".jpeg",
    alt: "Potes herméticos",
    link: "/product-single/Potes-hermeticos",
    title: "Potes herméticos",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 24,
    ext: ".png",
    alt: "Microondas",
    link: "/product-single/Microondas",
    title: "Microondas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 25,
    ext: ".webp",
    alt: "Forno elétrico",
    link: "/product-single/Forno-eletrico",
    title: "Forno elétrico",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 26,
    ext: ".webp",
    alt: "Cocktop",
    link: "/product-single/Cocktop",
    title: "Cocktop",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 27,
    ext: ".jpg",
    alt: "Mesa com cadeiras",
    link: "/product-single/Mesa-com-cadeiras",
    title: "Mesa com cadeiras",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 28,
    ext: ".webp",
    alt: "Tábua de cortar carne",
    link: "/product-single/Tabua-de-cortar-carne",
    title: "Tábua de cortar carne",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 29,
    ext: ".webp",
    alt: "Jogo de Toalhas",
    link: "/product-single/Jogo-de-toalhas",
    title: "Jogo de Toalhas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 30,
    ext: ".png",
    alt: "Televisão",
    link: "/product-single/Televisao",
    title: "Televisão",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 31,
    ext: ".png",
    alt: "Geladeira",
    link: "/product-single/Geladeira",
    title: "Geladeira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 32,
    ext: ".webp",
    alt: "Potes de plástico",
    link: "/product-single/Potes-de-plastico",
    title: "Potes de plástico",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 33,
    ext: ".png",
    alt: "Marmita elétrica",
    link: "/product-single/Marmiteira-eletrica",
    title: "Marmita elétrica",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 34,
    ext: ".png",
    alt: "Jogo de taças",
    link: "/product-single/Jogo-de-tacas",
    title: "Jogo de taças",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 35,
    ext: ".webp",
    alt: "Caixa térmica",
    link: "/product-single/Caixa-termica",
    title: "Caixa térmica",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 36,
    ext: ".jpg",
    alt: "Jogo de churrasco",
    link: "/product-single/Jogo-de-churrasco",
    title: "Jogo de churrasco",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 37,
    ext: ".webp",
    alt: "Cortinas",
    link: "/product-single/Cortinas",
    title: "Cortinas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 38,
    ext: ".jpg",
    alt: "Ventilador de pé",
    link: "/product-single/Ventilador-de-pe",
    title: "Ventilador de pé",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 39,
    ext: ".jpg",
    alt: "Climatizador de ar",
    link: "/product-single/Climatizador-de-ar",
    title: "Climatizador de ar",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 40,
    ext: ".jpg",
    alt: "Jogo de guardanapo",
    link: "/product-single/Jogo-de-guardanapo",
    title: "Jogo de guardanapo",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 41,
    ext: ".jpg",
    alt: "Máquina centrífuga",
    link: "/product-single/Maquina-centrifuga",
    title: "Máquina centrífuga",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 42,
    ext: ".jpg",
    alt: "Ferro de passar roupa",
    link: "/product-single/Ferro-de-passar-roupa",
    title: "Ferro de passar roupa",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 43,
    ext: ".webp",
    alt: "Chaleira",
    link: "/product-single/Chaleira",
    title: "Chaleira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 44,
    ext: ".jpg",
    alt: "Bule de café",
    link: "/product-single/Bule-de-cafe",
    title: "Bule de café",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 45,
    ext: ".jpg",
    alt: "Cafeteira",
    link: "/product-single/Cafeteira",
    title: "Cafeteira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 46,
    ext: ".jpg",
    alt: "Porta temperos",
    link: "/product-single/Porta-temperos",
    title: "Porta temperos",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 47,
    ext: ".jpg",
    alt: "Máquina de suco de laranja",
    link: "/product-single/Maquina-de-suco-de-laranja",
    title: "Máquina de suco de laranja",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 48,
    ext: ".jpeg",
    alt: "Conchas, colher de pau, pilão",
    link: "/product-single/Conchas-colher-de-pau-pilao",
    title: "Conchas, colher de pau, pilão",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 49,
    ext: ".webp",
    alt: "Garrafa de café",
    link: "/product-single/Garrafa-de-cafe",
    title: "Garrafa de café",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 50,
    ext: ".webp",
    alt: "Rack de sala",
    link: "/product-single/Rack-de-sala",
    title: "Rack de sala",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 51,
    ext: ".webp",
    alt: "Painel de TV",
    link: "/product-single/Painel-de-tv",
    title: "Painel de TV",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 52,
    ext: ".jpg",
    alt: "Edredons",
    link: "/product-single/Edredons",
    title: "Edredons",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 53,
    ext: ".webp",
    alt: "Chopeira",
    link: "/product-single/Chopeira",
    title: "Chopeira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 54,
    ext: ".webp",
    alt: "Suqueira",
    link: "/product-single/Suqueira",
    title: "Suqueira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 55,
    ext: ".webp",
    alt: "Bomboniere",
    link: "/product-single/Bomboniere",
    title: "Bomboniere",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 56,
    ext: ".jpg",
    alt: "Balde de gelo inox",
    link: "/product-single/Balde-de-gelo-inox",
    title: "Balde de gelo inox",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 57,
    ext: ".webp",
    alt: "Potes para sobremesa",
    link: "/product-single/Potes-para-sobremesa",
    title: "Potes para sobremesa",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 58,
    ext: ".webp",
    alt: "Almofadas",
    link: "/product-single/Almofadas",
    title: "Almofadas",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 59,
    ext: ".webp",
    alt: "Petisqueira",
    link: "/product-single/Petisqueira",
    title: "Petisqueira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 60,
    ext: ".webp",
    alt: "Travesseiros",
    link: "/product-single/Travesseiros",
    title: "Travesseiros",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 61,
    ext: ".webp",
    alt: "Jogo americano",
    link: "/product-single/Jogo-americano",
    title: "Jogo americano",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 62,
    ext: ".webp",
    alt: "Aparelho de fondue",
    link: "/product-single/Aparelho-de-fondue",
    title: "Aparelho de fondue",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 63,
    ext: ".webp",
    alt: "Tapete",
    link: "/product-single/Tapete",
    title: "Tapete",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 64,
    ext: ".jpg",
    alt: "Cervejeira",
    link: "/product-single/Cervejeira",
    title: "Cervejeira",
    price: ["$0.00"],
    available: true,
    received: false,
  },
  {
    id: 72,
    ext: ".webp",
    alt: "Jogo de cama",
    link: "/product-single/Jogo-de-cama",
    title: "Jogo de cama",
    price: ["$0.00"],
    available: true,
    received: false,
  },

  // presentes indisponíveis
  {
    id: 65,
    ext: ".jpg",
    alt: "Airfryer",
    link: "/product-single/Airfryer",
    title: "Airfryer",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 66,
    ext: ".jpg",
    alt: "Sanduicheira",
    link: "/product-single/Sanduicheira",
    title: "Sanduicheira",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 67,
    ext: ".jpeg",
    alt: "Liquidificador",
    link: "/product-single/Liquidificador",
    title: "Liquidificador",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 68,
    ext: ".jpg",
    alt: "Batedeira",
    link: "/product-single/Batedeira",
    title: "Batedeira",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 69,
    ext: ".webp",
    alt: "Pipoqueira",
    link: "/product-single/Pipoqueira",
    title: "Pipoqueira",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 70,
    ext: ".jpeg",
    alt: "Churrasqueira elétrica",
    link: "/product-single/Churrasqueira-eletrica",
    title: "Churrasqueira elétrica",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 71,
    ext: ".jpg",
    alt: "Purificador de Água",
    link: "/product-single/Purificador de Água",
    title: "Purificador de Água",
    price: ["$0.00"],
    available: false,
    received: false,
  },
  {
    id: 73,
    ext: ".webp",
    alt: "Panela elétrica de arroz",
    link: "/product-single/Panela-eletrica-de-arroz",
    title: "Panela elétrica de arroz",
    price: ["$0.00"],
    available: false,
    received: true,
  },
  {
    id: 74,
    ext: ".jpg",
    alt: "Fogão",
    link: "/product-single/Fogao",
    title: "Fogão",
    price: ["$0.00"],
    available: false,
    received: true,
  },
];

export default function Gifts() {
  const config = {
    showPrices: false,
  };

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
                      {listGifts
                        .filter((product) => product.ext)
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
                                <Image
                                  src={`/images/gifts/${product.id}${product.ext}`}
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
                                          `https://api.whatsapp.com/send?phone=5591984546411&text=Oi, gostaria de registrar minha intenção de presentear ${product.title} para o seu casamento.`,
                                        );
                                      }}
                                    >
                                      Presentear
                                    </button>
                                  </li>
                                </ul>
                              </div>
                              <div className="wpo-product-text">
                                <h3>
                                  <a href={product.link}>{product.title}</a>
                                </h3>
                                {config.showPrices && (
                                  <ul>
                                    <li>{product.price[0]}</li>
                                    <li>{product.price[1]}</li>
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
