import Image from "next/image";

export default function L1Section3() {
  return (
    <section className="wpo-story-section section-padding" id="story">
      <div className="container">
        <div className="wpo-section-title">
          <span>Nossa história</span>
          <h2>Como aconteceu</h2>
        </div>
        <div className="wpo-story-wrap">
          <div className="wpo-story-item">
            <div className="wpo-story-img-wrap">
              <div className="css-1py3kjq" style={{ animationDelay: "0ms" }}>
                <div className="wpo-story-img">
                  <Image
                    src="/images/photos/4.jpg"
                    alt=""
                    width={239}
                    height={310}
                  />
                </div>
              </div>
              <div className="clip-shape">
                <svg
                  viewBox="0 0 382 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M191 0L381.526 110V330L191 440L0.474411 330V110L191 0Z"></path>
                </svg>
              </div>
              <div className="wpo-img-shape">
                <Image
                  src="/images/shape.png"
                  alt=""
                  width={535}
                  height={535}
                />
              </div>
            </div>
            <div className="wpo-story-content">
              <div className="wpo-story-content-inner">
                <span>15 June 2014</span>
                <h2>Como nos conhecemos</h2>
                <p>
                  Consectetur adipiscing elit. Fringilla at risus orci, tempus
                  facilisi sed. Enim tortor, faucibus netus orci donec volutpat
                  adipiscing. Sit condimentum elit convallis libero. Nunc in eu
                  tellus ipsum placerat.
                </p>
              </div>
            </div>
          </div>

          <div className="wpo-story-item">
            <div className="wpo-story-img-wrap">
              <div className="css-1py3kjq" style={{ animationDelay: "0ms" }}>
                <div className="wpo-story-img">
                  <Image
                    src="/images/photos/5.jpg"
                    alt=""
                    width={239}
                    height={310}
                  />
                </div>
              </div>
              <div className="clip-shape">
                <svg
                  viewBox="0 0 382 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M191 0L381.526 110V330L191 440L0.474411 330V110L191 0Z"></path>
                </svg>
              </div>
              <div className="wpo-img-shape">
                <Image
                  src="/images/shape2.png"
                  alt=""
                  width={535}
                  height={535}
                />
              </div>
            </div>
            <div className="wpo-story-content">
              <div className="wpo-story-content-inner">
                <span>10 de dezembro de 2022</span>
                <h2>Ele propôs, eu disse sim</h2>
                <p>
                  Consectetur adipiscing elit. Fringilla at risus orci, tempus
                  facilisi sed. Enim tortor, faucibus netus orci donec volutpat
                  adipiscing. Sit condimentum elit convallis libero. Nunc in eu
                  tellus ipsum placerat.
                </p>
              </div>
            </div>
          </div>

          <div className="wpo-story-item">
            <div className="wpo-story-img-wrap">
              <div className="css-1py3kjq" style={{ animationDelay: "0ms" }}>
                <div className="wpo-story-img">
                  <Image
                    src="/images/photos/6.jpg"
                    alt=""
                    width={239}
                    height={310}
                  />
                </div>
              </div>
              <div className="clip-shape">
                <svg
                  viewBox="0 0 382 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M191 0L381.526 110V330L191 440L0.474411 330V110L191 0Z"></path>
                </svg>
              </div>
              <div className="wpo-img-shape">
                <Image
                  src="/images/shape3.png"
                  alt=""
                  width={549}
                  height={660}
                />
              </div>
            </div>
            <div className="wpo-story-content">
              <div className="wpo-story-content-inner">
                <span>10 de dezembro de 2024</span>
                <h2>Nosso dia de noivado</h2>
                <p>
                  Consectetur adipiscing elit. Fringilla at risus orci, tempus
                  facilisi sed. Enim tortor, faucibus netus orci donec volutpat
                  adipiscing. Sit condimentum elit convallis libero. Nunc in eu
                  tellus ipsum placerat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flower-shape-1">
        <Image
          src="/images/flower-shape1.svg"
          alt=""
          width={370}
          height={720}
        />
      </div>
      <div className="flower-shape-2">
        <Image
          src="/images/flower-shape2.svg"
          alt=""
          width={304}
          height={660}
        />
      </div>
      <div className="flower-shape-3">
        <Image
          src="/images/flower-shape3.svg"
          alt=""
          width={279}
          height={641}
        />
      </div>
      <div className="flower-shape-4">
        <Image
          src="/images/flower-shape4.svg"
          alt=""
          width={156}
          height={210}
        />
      </div>
    </section>
  );
}
