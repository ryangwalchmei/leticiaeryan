import Image from "next/image";

export default function L2Section3() {
  const listTexts = {
    row1: {
      title: "Nos conhecemos",
      date: "fev 2022",
      image: "/images/photos/history1.jpg",
      text: "Consectetur adipiscing elit. Fringilla at risus orci, tempus facilisi sed. Enim tortor, faucibus netus orci donec volutpat adipiscing. Sit condimentum elit convallis libero. Nunc in eu tellus ipsum placerat.",
    },
    row2: {
      title: "Ele propôs, eu disse sim",
      date: "10 Dez 2022",
      image: "/images/photos/history2.jpg",
      text: "Consectetur adipiscing elit. Fringilla at risus orci, tempus facilisi sed. Enim tortor, faucibus netus orci donec volutpat adipiscing. Sit condimentum elit convallis libero. Nunc in eu tellus ipsum placerat.",
    },
    row3: {
      title: "Nosso dia de noivado",
      date: "10 Dez 2024",
      image: "/images/photos/history3.jpg",
      text: "Consectetur adipiscing elit. Fringilla at risus orci, tempus facilisi sed. Enim tortor, faucibus netus orci donec volutpat adipiscing. Sit condimentum elit convallis libero. Nunc in eu tellus ipsum placerat.",
    },
  };

  const renderStoryItem = (row, reverse = false) => (
    <div className="wpo-story-item">
      <div className="row">
        <div
          className={`col col-lg-6 col-12 ${reverse ? "order-lg-2 order-1" : ""}`}
        >
          <div className="wpo-story-img">
            <Image
              src={row.image || "/images/photos/default.jpg"}
              alt=""
              width={593}
              height={484}
            />
          </div>
        </div>
        <div
          className={`col col-lg-6 col-12 ${reverse ? "order-lg-1 order-2" : ""}`}
        >
          <div
            className={`animate__animated ${reverse ? "animate__fadeInLeft" : "animate__fadeInRight"}`}
            style={{ animationDelay: "0ms" }}
          >
            <div className="wpo-story-content ">
              <div className="thumb">
                <span>{row.date}</span>
                <div className="pin ">
                  <Image src="/images/pin.svg" alt="" width={38} height={65} />
                </div>
              </div>
              <h2>{row.title}</h2>
              <p>{row.text}</p>
              <div className="flower">
                <Image
                  src="/images/flower.svg"
                  alt=""
                  width={186}
                  height={181}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ring-wrap">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="ring" key={index}>
            <Image src="/images/ring.svg" alt="" width={39} height={17} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="wpo-story-section-s2 section-padding" id="story">
      <div className="container">
        <div className="wpo-section-title undefined">
          <span>Nossa história</span>
          <h2>Como aconteceu</h2>
        </div>
        <div className="wpo-story-wrap">
          {renderStoryItem(listTexts.row1)}
          {renderStoryItem(listTexts.row2, true)}
          {renderStoryItem(listTexts.row3)}
        </div>
      </div>
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className={`flower-shape-${num}`}>
          <Image
            src={`/images/flower-shape${num}.svg`}
            alt=""
            width={num === 1 ? 370 : num === 2 ? 304 : num === 3 ? 279 : 156}
            height={num === 1 ? 720 : num === 2 ? 660 : num === 3 ? 641 : 210}
          />
        </div>
      ))}
    </section>
  );
}
