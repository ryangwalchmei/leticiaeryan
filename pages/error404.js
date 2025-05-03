import { Navbar } from "components/navbar/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Error404() {
  return (
    <>
      <Navbar />
      <section className="error-404-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="content clearfix">
                <div className="error">
                  <Image
                    src="/images/error-404.svg"
                    width={465}
                    height={271}
                    alt=""
                  />
                </div>
                <div className="error-message">
                  <h3>Oops! Página não encontrada!</h3>
                  <p>
                    Lamentamos, mas não conseguimos encontrar a página que você
                    solicitou. Isso pode ocorrer porque você digitou o endereço
                    da web incorretamente.
                  </p>
                  <Link className="theme-btn" href="/">
                    {" "}
                    Voltar à Página Inicial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
