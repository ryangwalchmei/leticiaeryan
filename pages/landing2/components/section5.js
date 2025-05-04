import Image from "next/image";
import Link from "next/link";

export default function L2Section5() {
  const listInformations = {
    title: "Você vai participar?",
    subtitle: "Então confirme sua presença!",
    textButton: "RSVP",
  };

  const shapes = [
    {
      src: "images/shape.5cd3fd7f.svg",
      width: 126,
      height: 126,
      className: "",
      style: {},
    },
    {
      src: "images/shape2.2feeb9cc.svg",
      width: 422,
      height: 415,
      className: "css-9l6fbh",
      style: { animationDelay: "0ms" },
    },
    {
      src: "images/shape3.cc20e434.svg",
      width: 203,
      height: 329,
      className: "css-1cdo1ab",
      style: { animationDelay: "0ms" },
    },
    {
      src: "images/shape4.1c07d73f.svg",
      width: 84,
      height: 84,
      className: "",
      style: {},
    },
    {
      src: "images/shape5.97b24316.svg",
      width: 291,
      height: 527,
      className: "css-1wm1lhc",
      style: { animationDelay: "0ms" },
    },
    {
      src: "images/shape6.1962cab9.svg",
      width: 310,
      height: 397,
      className: "css-ngpoky",
      style: { animationDelay: "0ms" },
    },
  ];

  return (
    <section className="wpo-contact-section pt-120 section-padding">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
            <div className="wpo-contact-section-wrapper">
              <div className="wpo-section-title">
                <h2>{listInformations.title}</h2>
                <span>{listInformations.subtitle}</span>
              </div>
              <div className="wpo-contact-form-area">
                <form className="contact-validation-active">
                  <div className="submit-area">
                    <button className="theme-btn">
                      <Link style={{ color: "ButtonHighlight" }} href="rsvp">
                        {listInformations.textButton}
                      </Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bg">
        <svg
          viewBox="0 0 1920 634"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="bg-path"
            d="M207 286C162.2 87.6 39 44.6667 -17 48L-91 22L-71 726H13L1977 670L1957 424C1926.6 318.4 1815 392 1763 442C1619.8 570 1503.33 495.333 1463 442C1270.2 162.8 1197.33 325.667 1185 442C1159.4 584.4 1117 537.333 1099 496C953.4 192.8 868.333 328.333 844 434C791.2 649.2 649.333 555.667 585 482C455.4 356.4 380.333 429.667 359 482C315 616.4 273.333 547.333 258 496L207 286Z"
            fill=""
          ></path>
          <path
            className="bg-stroke"
            d="M207 266C162.2 67.6 39 24.6667 -17 28L-91 2L-71 706H13L1977 650L1957 404C1926.6 298.4 1815 372 1763 422C1619.8 550 1503.33 475.333 1463 422C1270.2 142.8 1197.33 305.667 1185 422C1159.4 564.4 1117 517.333 1099 476C953.4 172.8 868.333 308.333 844 414C791.2 629.2 649.333 535.667 585 462C455.4 336.4 380.333 409.667 359 462C315 596.4 273.333 527.333 258 476L207 266Z"
            stroke=""
            strokeWidth="2"
          ></path>
        </svg>
        {shapes.map((shape, index) => (
          <div key={index} className={`shape-${index + 1}`}>
            <div className={shape.className} style={shape.style}>
              <Image
                alt=""
                src={shape.src}
                width={shape.width}
                height={shape.height}
                decoding="async"
                data-nimg="1"
                loading="lazy"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
