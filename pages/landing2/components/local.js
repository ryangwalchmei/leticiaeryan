import Link from "next/link";
import React from "react";
import { TfiMapAlt } from "react-icons/tfi";

export default function Local() {
  function Cards() {
    const cardsInfo = [
      {
        Icon: TfiMapAlt,
        title: "Sítio Paraíso",
        text: `Trav. Irituia, nº 184, Angelim, Paragominas - PA (Próx. ao Geneves Eventos`,
      },
    ];

    return cardsInfo.map(({ title, text, Icon }, i) => (
      <div key={i} className="col col-xl-4 col-lg-6 col-md-6 col-12">
        <div className="office-info-item">
          <div className="office-info-icon">
            <div className="icon">
              <Icon size={35} />
            </div>
          </div>
          <div className="office-info-text">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>{" "}
          <div className="submit-area">
            <button className="theme-btn">
              <Link
                style={{ color: "ButtonHighlight" }}
                target="_blank"
                href={`https://www.google.com/maps?q=2°59'11.5"S+47°21'43.1"W`}
              >
                Obter Rotas
              </Link>
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <section className="wpo-contact-pg-section section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-lg-12 ">
            <div className="wpo-section-title undefined">
              <h2>Localização</h2>
              <p>A celebração da cerimônia e repção será no mesmo local.</p>
            </div>
            <div className="office-info">
              <div className="row justify-content-center">
                <Cards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
