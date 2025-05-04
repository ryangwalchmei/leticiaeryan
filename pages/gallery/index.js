import { useState } from "react";
import { Navbar } from "components/navbar/navbar";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaEye, FaTimes } from "react-icons/fa";
import WpoPageTitle from "components/wpoPageTitle";
import Footer from "components/footer";

const styles = {
  slideImage: {
    maxWidth: "min(552px, 100%)",
    maxHeight: "min(398px, 100%)",
    transition: "opacity 2s ease-in-out",
  },
  masonryContainer: {
    columnCount: 3,
    columnGap: "30px",
  },
  masonryItem: {
    breakInside: "avoid",
    marginBottom: "30px",
  },
};

const media = [
  { type: "video", src: "/videos/RYAN-MT07 2 .mp4" },
  { type: "image", src: "/images/photos/4.33ff15a4e154d08a9855.jpg" },
  { type: "image", src: "/images/photos/5.93a7729d2b72463c8551.jpg" },
  { type: "image", src: "/images/photos/6.8013d474b24a27f1c5ef.jpg" },
];

const renderMediaGrid = (item, onClick) => (
  <div className="grid" style={styles.masonryItem} onClick={onClick}>
    <div className="img-holder" style={{ cursor: "pointer" }}>
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt=""
          width={530}
          height={300}
          className="img img-responsive"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      ) : (
        <video
          src={item.src}
          controls={false}
          width="100%"
          height="auto"
          muted
          autoPlay
          loop
          style={{ width: "100%", display: "block" }}
        />
      )}
      <div className="hover-content">
        <FaEye />
      </div>
    </div>
  </div>
);

const renderSlide = (item, isActive) => (
  <div
    className={`yarl__slide yarl__flex_center ${isActive ? "active-slide" : "inactive-slide"}`}
  >
    {item.type === "image" ? (
      <Image
        draggable="false"
        className="yarl__slide_image"
        src={item.src}
        width={552}
        height={398}
        alt="Slide"
        style={{
          ...styles.slideImage,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    ) : (
      <video
        controls
        autoPlay
        muted
        style={{ maxWidth: "100%", maxHeight: "398px" }}
      >
        <source src={item.src} type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>
    )}
  </div>
);

export default function Gallery() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPortal = (index) => {
    setCurrentIndex(index);
    setIsPortalOpen(true);
  };

  const closePortal = () => setIsPortalOpen(false);

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />
      <WpoPageTitle title={"Galeria de fotos e vídeos"} />
      <section
        className="wpo-portfolio-section-s2 section-padding pb-0 pt-120"
        id="gallery"
      >
        <div className="container-fluid">
          <div className="sortable-gallery">
            <div className="gallery-filters"></div>
            <div className="row">
              <div className="col-lg-12">
                <div className="portfolio-grids gallery-container clearfix">
                  <div style={styles.masonryContainer}>
                    {media.map((item, index) =>
                      renderMediaGrid(item, () => openPortal(index)),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isPortalOpen && (
        <div
          className="yarl__root yarl__portal yarl__no_scroll_padding yarl__portal_open fade-in"
          role="presentation"
          aria-live="polite"
        >
          <div className="yarl__container yarl__flex_center" tabIndex="-1">
            <div className="yarl__carousel yarl__carousel_with_slides">
              {renderSlide(media[currentIndex], true)}
            </div>

            <div className="yarl__toolbar">
              <button
                className="yarl__button"
                onClick={closePortal}
                aria-label="Close"
              >
                <FaTimes size={30} />
              </button>
            </div>

            <button
              className="yarl__button yarl__navigation_prev"
              onClick={showPrevious}
              aria-label="Previous"
            >
              <FaArrowLeft size={30} />
            </button>
            <button
              className="yarl__button yarl__navigation_next"
              onClick={showNext}
              aria-label="Next"
            >
              <FaArrowRight size={30} />
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
