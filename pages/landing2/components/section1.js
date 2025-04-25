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
    <section className="section1 static-hero-s2">
      <div className="hero-container">
        <div className="hero-inner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 col-12">
                <div className="wpo-static-hero-inner">
                  <AnimatedDiv
                    className="slide-title-sub css-1pvcaf"
                    style={{ animationDelay: "0ms" }}
                  >
                    <h3 className="titleCouple">{listInformations.title}</h3>
                  </AnimatedDiv>
                  <AnimatedDiv
                    className="slide-title css-1mq9hl3"
                    style={{ animationDelay: "20ms" }}
                  >
                    <h2>{listInformations.subtitle}</h2>
                  </AnimatedDiv>
                  <AnimatedDiv
                    className="slide-text css-1idtd5j"
                    style={{ animationDelay: "0ms" }}
                  >
                    <p>{listInformations.date}</p>
                  </AnimatedDiv>
                  <StaticHeroShape
                    src="/images/shape2.svg"
                    width={223}
                    height={222}
                    className="shape-2 css-1a0toe9"
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
            className="static-hero-shape-1 css-5dedai"
          />
          <StaticHeroShape
            src="/images/shape8.svg"
            width={473}
            height={462}
            className="static-hero-shape-2 css-5dedai"
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
    </section>
  );
}
