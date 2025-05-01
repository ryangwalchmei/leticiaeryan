import Navbar from "../components/navbar/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Error404() {
  return (
    <>
      <Navbar />
      <section class="error-404-section section-padding">
        <div class="container">
          <div class="row">
            <div class="col col-xs-12">
              <div class="content clearfix">
                <div class="error">
                  <Image
                    src="/images/error-404.svg"
                    width={465}
                    height={271}
                    alt=""
                  />
                </div>
                <div class="error-message">
                  <h3>Oops! Página não encontrada!</h3>
                  <p>
                    Lamentamos, mas não conseguimos encontrar a página que você
                    solicitou. Isso pode ocorrer porque você digitou o endereço
                    da web incorretamente.
                  </p>
                  <Link class="theme-btn" href="/landing2">
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
