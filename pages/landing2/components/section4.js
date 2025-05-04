import Image from "next/image";
import { FaEye } from "react-icons/fa";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

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

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, dots: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, dots: true },
      },
    ],
  };

  return (
    <section className="wpo-portfolio-section section-padding" id="gallery">
      <h2 className="hidden">Galeria</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="portfolio-grids gallery-container portfolio-slide">
              <Slider {...settings}>
                {listPhotos.map((photo, idx) => (
                  <div key={idx} className="grid">
                    <div
                      className="img-holder"
                      onClick={() => {
                        setIndex(idx);
                        setOpen(true);
                      }}
                    >
                      <Image
                        src={photo}
                        alt={`Foto ${idx + 1}`}
                        className="img img-responsive"
                        width={273}
                        height={355}
                      />
                      <div className="hover-content">
                        <FaEye />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={listPhotos.map((src) => ({ src }))}
        carousel={{ finite: false, preload: true }}
      />
    </section>
  );
}
