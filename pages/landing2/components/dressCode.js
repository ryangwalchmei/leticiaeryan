import Image from "next/image";

export default function DressCode() {
  return (
    <>
      <section class="wpo-about-section section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-8 col-md-10 col-12">
              <div class="wpo-section-title undefined">
                <span>Dress Code</span>
                <h2>O que vestir para o casamento?</h2>
              </div>
            </div>
          </div>
          <div class="wpo-about-wrap">
            <div class="row align-items-center">
              <div class="col-xl-5 offset-xl-1 col-lg-6 col-md-12 col-12">
                <div class="wpo-about-text" style={{ textAlign: "justify" }}>
                  <p>
                    <small>P</small>
                    ara tornar nosso dia ainda mais especial, preparamos cada
                    detalhe com muito carinho — e isso inclui também o que vamos
                    vestir! Nosso casamento terá um estilo rústico, clássico e
                    ao ar livre. Você também pode se ajustar conforme o estilo
                    do evento, e gostaríamos que todos estivessem à vontade, mas
                    também em harmonia com esse clima.
                  </p>
                  <div class="about-info">
                    <h4>Traje Sugerido</h4>
                    <span>
                      Esporte fino ou social leve — pense em tecidos leves,
                      cores suaves e elegância sem exageros. Para os homens,
                      camisa e calça social (com ou sem paletó). Para as
                      mulheres, vestidos ou conjuntos elegantes, em tons que
                      combinem com o ambiente.
                    </span>
                  </div>
                  <div class="about-info">
                    <h4>Dica Importante!</h4>
                    <span>
                      Pedimos, por gentileza, que evitem as cores branco e
                      verde, que serão usadas pelos noivos e padrinhos.
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                <div class="wpo-about-img">
                  <div class="about-right-img">
                    <Image
                      style={{ height: "auto" }}
                      src="/images/dress1.jpg"
                      width={800}
                      height={780}
                      alt=""
                    />
                    <div class="about-right-img-inner">
                      <Image
                        style={{ height: "auto" }}
                        src="/images/dress2.jpg"
                        width={480}
                        height={630}
                        alt=""
                      />
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
