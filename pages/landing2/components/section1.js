import Image from "next/image";

export default function L2Section1() {
  return (
    <section className="section1 static-hero-s2">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-12">
                <div className="wpo-static-hero-inner">
                  <div className="slide-title-sub">
                    <div
                      className="css-1pvcaf"
                      style={{ animationDelay: "0ms" }}
                    >
                      <h3 className="titleCouple">Letícia e Ryan</h3>
                    </div>
                  </div>
                  <div className="slide-title">
                    <div
                      className="css-1mq9hl3"
                      style={{ animationDelay: "0ms" }}
                    >
                      <h2>Save the Date</h2>
                    </div>
                  </div>
                  <div className="slide-text">
                    <div
                      className="css-1idtd5j"
                      style={{ animationDelay: "0ms" }}
                    >
                      <p>12 de julho de 2025</p>
                    </div>
                  </div>
                  <div className="shape-2">
                    <div
                      className="css-1a0toe9"
                      style={{ animationDelay: "0ms" }}
                    >
                      <Image
                        src="/images/shape2.svg"
                        alt=""
                        width={223}
                        height={222}
                      />
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="static-hero-right">
        <div className="static-hero-img scene" id="scene">
          <div className="static-hero-img-inner">
            <Image
              className="zoom"
              src="/images/photos/7.jpg"
              alt=""
              width={460}
              height={715}
            />
            <div className="hero-img-inner-shape">
              <Image src="/images/shape9.svg" alt="" width={500} height={194} />
            </div>
            <div className="hero-img-inner-shape-2">
              <Image
                src="/images/shape10.svg"
                alt=""
                width={500}
                height={176}
              />
            </div>
          </div>
          <div className="static-hero-shape-1">
            <div className="css-5dedai" style={{ animationDelay: "0ms" }}>
              <Image src="/images/shape7.svg" alt="" width={477} height={451} />
            </div>
          </div>
          <div className="static-hero-shape-2">
            <div className="css-5dedai" style={{ animationDelay: "0ms" }}>
              <Image src="/images/shape8.svg" alt="" width={473} height={462} />
            </div>
          </div>
          <div className="inner-image-1">
            <span className="layer" data-depth="0.25">
              <Image
                src="/images/photos/inner-1.jpg"
                alt=""
                width={208}
                height={208}
              />
            </span>
          </div>
          <div className="inner-image-2">
            <span className="layer" data-depth="0.45">
              <Image
                src="/images/photos/inner-2.jpg"
                alt=""
                width={208}
                height={208}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
