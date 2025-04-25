import Image from "next/image";
import { FaEye } from "react-icons/fa";

export default function L2Section4() {
  const listPhotos = [
    "/images/photos/1.jpg",
    "/images/photos/4.jpg",
    "/images/photos/5.jpg",
    "/images/photos/6.jpg",
    "/images/photos/7.jpg",
    "/images/photos/6.jpg",
    "/images/photos/4.jpg",
  ];

  return (
    <section
      className="wpo-portfolio-section section-padding undefined"
      id="gallery"
    >
      <h2 className="hidden">some</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="portfolio-grids gallery-container clearfix portfolio-slide">
              <div className="slick-slider slick-initialized" dir="ltr">
                <div className="slick-list">
                  <div className="slick-track slick-track-styleduser">
                    {listPhotos.map((photoNumber, index) => {
                      return (
                        <div
                          key={index}
                          data-index="-5"
                          tabindex="-1"
                          className="slick-slide slick-cloned"
                          aria-hidden="true"
                          style={{ width: "303px" }}
                        >
                          <div>
                            <div
                              className="grid"
                              tabindex="-1"
                              style={{ width: "100%", display: "inline-block" }}
                            >
                              <div className="img-holder">
                                <Image
                                  src={`${photoNumber}`}
                                  alt=""
                                  className="img img-responsive"
                                  width={273}
                                  height={355}
                                />
                                <div className="hover-content">
                                  <FaEye />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
