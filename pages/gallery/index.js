import { useState } from "react";
import { Navbar } from "components/navbar/navbar";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import WpoPageTitle from "components/wpoPageTitle";
import Footer from "components/footer";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

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
  { type: "image", src: "/images/photos/gallery/1.jpg" },
  { type: "image", src: "/images/photos/gallery/7.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-1.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-6.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-7.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-8.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-9.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-11.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-19.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-21.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-24.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-25.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-26.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-28.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-48.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-51.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-52.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-76.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-82.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-83.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-85.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-87.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-88.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-92.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-93.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-94.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-95.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-96.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-97.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-109.jpg" },
  { type: "image", src: "/images/photos/gallery/Ensaio-112.jpg" },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClick = (i) => {
    setIndex(i);
    setOpen(true);
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
            <div className="row">
              <div className="col-lg-12">
                <div className="portfolio-grids gallery-container clearfix">
                  <div style={styles.masonryContainer}>
                    {media.map((item, i) => (
                      <div
                        className="grid"
                        style={styles.masonryItem}
                        key={i}
                        onClick={() => handleClick(i)}
                      >
                        <div
                          className="img-holder"
                          style={{ cursor: "pointer", position: "relative" }}
                        >
                          {item.type === "image" ? (
                            <Image
                              src={item.src}
                              alt=""
                              width={530}
                              height={300}
                              className="img img-responsive"
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                              }}
                            />
                          ) : (
                            <video
                              src={item.src}
                              muted
                              autoPlay
                              loop
                              style={{ width: "100%", display: "block" }}
                            />
                          )}
                          <div
                            className="hover-content"
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              color: "white",
                            }}
                          >
                            <FaEye />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={media.map((item) =>
          item.type === "video"
            ? {
                type: "video",
                width: 1280,
                height: 720,
                sources: [{ src: item.src, type: "video/mp4" }],
              }
            : { src: item.src },
        )}
        plugins={[Video]}
        carousel={{ finite: false, preload: true }}
      />
      <Footer />
    </>
  );
}
