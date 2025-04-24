import Image from "next/image";

export default function L1Section1() {
  return (
    <section className="static-hero">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-12">
                <div className="wpo-static-hero-inner">
                  <div className="shape-1">
                    <div class="css-1pvcaf" style={{ animationDelay: "0ms" }}>
                      <Image
                        src="/images/shape1.svg"
                        alt=""
                        class=""
                        width={211}
                        height={83}
                      />
                    </div>
                  </div>
                  <div className="slide-title">
                    <div
                      className="css-1mq9hl3"
                      style={{ animationDelay: "0ms" }}
                    >
                      <h2 className="">Letícia e Ryan</h2>
                    </div>
                  </div>
                  <div className="slide-text">
                    <div
                      className="css-1idtd5j"
                      style={{ animationDelay: "0ms" }}
                    >
                      <p className="">12 de julho de 2025</p>
                    </div>
                  </div>
                  <div className="shape-2">
                    <div
                      className="css-8xt6b1"
                      style={{ animationDelay: "0ms" }}
                    >
                      <Image
                        src="/images/shape2.svg"
                        alt=""
                        className=""
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
            <Image src="/images/photos/1.jpg" alt="" width={334} height={525} />
          </div>
          <div className="static-hero-shape-1">
            <span className="layer" data-depth="0.25">
              <div className="css-v87i24" style={{ animationDelay: "0ms" }}>
                <Image
                  src="/images/shape3.svg"
                  alt=""
                  className=""
                  width={147}
                  height={159}
                />
              </div>
            </span>
          </div>
          <div className="static-hero-shape-2">
            <span className="layer" data-depth="0.45">
              <div className="css-1or2e28" style={{ animationDelay: "0ms" }}>
                <Image
                  src="/images/shape4.svg"
                  alt=""
                  className=""
                  width={110}
                  height={163}
                />
              </div>
            </span>
          </div>
          <div className="static-hero-shape-3">
            <span className="layer" data-depth="0.65">
              <div className="css-1idtd5j" style={{ animationDelay: "0ms" }}>
                <Image
                  src="/images/shape5.svg"
                  alt=""
                  className=""
                  width={162}
                  height={154}
                />
              </div>
            </span>
          </div>
          <div className="static-hero-shape-4">
            <div className="css-lvy0nt" style={{ animationDelay: "0ms" }}>
              <Image
                src="/images/shape6.svg"
                alt=""
                className=""
                width={110}
                height={163}
              />
            </div>
          </div>
        </div>
        <div className="static-hero-img-bg">
          <Image
            src="/images/bg-shape.png"
            alt=""
            className=""
            width={514}
            height={718}
          />
        </div>
      </div>
      <div className="right-shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 650 597"
          fill="none"
        >
          <path d="M717 0C717 0 527.91 0 475.696 129.736C423.481 259.472 501.092 358.185 396.683 423.034C292.274 487.902 74.9839 485.573 26.2847 646.096C-22.3947 806.598 11.4538 863 11.4538 863L653.509 803.776L717 0Z"></path>
        </svg>
      </div>
    </section>
  );
}
