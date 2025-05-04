import Image from "next/image";

export default function L2Section1() {
  const listInformations = {
    title: "Letícia e Ryan",
    subtitle: "Save the Date",
    date: "12 de julho de 2025",
  };

  const listPhotos = {
    bride: "/images/photos/inner-2.jpg",
    groom: "/images/photos/inner-1.jpg",
    couple: "/images/photos/7.jpg",
  };

  const AnimatedDiv = ({ className, style, children }) => (
    <div className={className} style={style}>
      {children}
    </div>
  );

  const StaticHeroShape = ({ src, width, height, className }) => (
    <div className={className}>
      <Image src={src} alt="" width={width} height={height} />
    </div>
  );

  const InnerImage = ({ src, width, height, depth }) => (
    <div className={`inner-image-${depth === 0.25 ? "1" : "2"}`}>
      <span className="layer" data-depth={depth}>
        <Image src={src} alt="" width={width} height={height} />
      </span>
    </div>
  );

  return (
    <section className="static-hero-s2">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-12">
                <div className="wpo-static-hero-inner">
                  <AnimatedDiv
                    className="slide-title-sub animate__animated animate__fadeInUp"
                    style={{ animationDelay: "0ms" }}
                  >
                    <h3 className="titleCouple">{listInformations.title}</h3>
                  </AnimatedDiv>
                  <AnimatedDiv
                    className="slide-title animate__animated animate__fadeInUp animate__slower "
                    style={{ animationDelay: "20ms" }}
                  >
                    <h2>{listInformations.subtitle}</h2>
                  </AnimatedDiv>
                  <AnimatedDiv
                    className="slide-text animate__animated animate__fadeInUp animate__slower"
                    style={{ animationDelay: "0ms" }}
                  >
                    <p>{listInformations.date}</p>
                  </AnimatedDiv>
                  <StaticHeroShape
                    src="/images/shape2.svg"
                    width={223}
                    height={222}
                    className="shape-2 animate__animated animate__fadeInUp animate__delay-1s animate__slower"
                    style={{ animationDelay: "20ms" }}
                  />
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
              src={listPhotos.couple}
              alt=""
              width={460}
              height={715}
            />
            <StaticHeroShape
              src="/images/shape9.svg"
              width={500}
              height={194}
              className="hero-img-inner-shape"
            />
            <StaticHeroShape
              src="/images/shape10.svg"
              width={500}
              height={176}
              className="hero-img-inner-shape-2"
            />
          </div>
          <StaticHeroShape
            src="/images/shape7.svg"
            width={477}
            height={451}
            className="static-hero-shape-1  animate__animated animate__rotateInUpLeft  animate__delay-1s"
          />
          <StaticHeroShape
            src="/images/shape8.svg"
            width={473}
            height={462}
            className="static-hero-shape-2 animate__animated animate__rotateInUpRight  animate__delay-2s"
          />
          <InnerImage
            src={listPhotos.groom}
            width={208}
            height={208}
            depth={0.25}
          />
          <InnerImage
            src={listPhotos.bride}
            width={208}
            height={208}
            depth={0.45}
          />
        </div>
      </div>
      <div className="left-shape ">
        <div class="left-shape-1 animate__animated animate__fadeInUp animate__delay-3s animate__slower ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 177 383"
            fill="none"
          >
            <path
              d="M167.726 404.933C178.762 383.436 180.815 359.362 167.119 341.847C147.887 317.271 96.7324 307.231 84.7796 280.695C77.4608 264.444 87.5548 247.29 95.5965 231.18C105.368 211.617 112.299 191.009 109.447 170.492C106.594 149.975 92.8858 129.419 67.8444 117.214C52.3548 109.662 31.5859 104.223 26.2291 91.9796C23.3377 85.3811 25.8806 78.3444 27.5715 71.5654C31.7795 54.7211 30.6307 37.2969 24.2155 20.7619C22.0211 15.1041 19.0136 9.33044 12.7016 5.2579C6.38957 1.19826 -4.06587 -0.567362 -11.3847 2.68035C-19.4392 6.25026 -20.317 13.738 -20.3944 20.1561C-20.7946 53.4581 -21.1947 86.7472 -21.5949 120.049C-22.8857 227.288 -24.1636 334.514 -23.9828 441.753C-23.9699 445.761 -23.686 450.233 -19.3489 453.017C-15.5798 455.453 -9.86154 455.853 -4.608 456.059C28.0749 457.412 81.8624 461.91 112.583 453.017C135.534 446.393 156.38 427.036 167.726 404.933Z"
              fill=""
            ></path>
          </svg>
        </div>
        <div class="left-shape-2 animate__animated animate__fadeInUp animate__delay-2s animate__slower">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 410 440"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M114.534 36.9236C91.906 7.20447 50.5877 -1.63653 13.232 0.245079C-29.3255 2.38445 -85.488 15.3238 -116.39 47.4916C-140.056 72.1229 -138.743 104.88 -137.465 136.771C-137.445 137.285 -137.424 137.798 -137.404 138.312C-133.87 226.123 -137.18 314.641 -140.48 402.886C-141.808 438.405 -143.135 473.88 -144.013 509.247C-70.5793 518.256 3.70596 516.31 77.6556 514.338L113.717 513.377C128.295 512.988 142.872 512.6 157.453 512.211L158.084 512.194C232.198 510.215 306.4 508.234 380.179 500.896C385.691 500.354 391.5 499.659 395.94 496.346C400.458 492.97 402.768 487.441 404.472 482.067C422.518 425.013 386.362 356.72 328.986 339.464C311.749 334.282 293.715 333.293 275.655 332.303C260.297 331.461 244.92 330.618 229.995 327.195C177.073 315.041 134.167 267.679 127.364 213.885C124.625 192.258 127.225 170.517 129.826 148.773C130.828 140.391 131.831 132.009 132.527 123.632C135.031 93.5267 132.837 60.9722 114.534 36.9236ZM247.708 265.26C235.639 277.593 215.606 280.403 199.638 273.83C141.837 250.039 162.593 158.098 227.675 189.454C241.434 196.091 252.871 208.077 257.273 222.691C261.687 237.293 258.395 254.357 247.708 265.26Z"
              fill=""
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
