import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaHome,
  FaGifts,
  FaPhotoVideo,
  FaPhone,
  FaCheck,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItens = [
    { name: "Home", link: "/landing2", icon: <FaHome /> },
    { name: "Lista de Presentes", link: "/gifts", icon: <FaGifts /> },
    { name: "Galeria de Fotos", link: "/gallery", icon: <FaPhotoVideo /> },
    { name: "Confirmar Presença", link: "/rsvp", icon: <FaCheck /> },
    { name: "Contato", link: "/contact", icon: <FaPhone /> },
  ];

  const router = useRouter();
  const currentRoute = router.pathname;

  const routesToTransparent = ["/landing2", "/"];
  const isTransparent = routesToTransparent.includes(currentRoute);

  useEffect(() => {
    if (!isTransparent) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <>
      <div className={`fixed-navbar fade show ${isScrolled ? "active " : ""}`}>
        <header
          id="header"
          style={{ paddingBottom: `${isMobile && isScrolled ? "6rem" : ""}` }}
        >
          <div className="wpo-site-header wpo-header-style-1 undefined">
            <nav className="navigation navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                    <div className="mobail-menu">
                      <div>
                        <div
                          className={`mobileMenu ${showMenuMobile && "show"}`}
                        >
                          <div
                            className="menu-close"
                            onClick={() => setShowMenuMobile(false)}
                          >
                            <FaTimes />
                          </div>
                          <ul className="responsivemenu">
                            {menuItens.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1yo8bqd"
                                >
                                  <Link href={item.link}>
                                    {item.name}
                                    <i>{item.icon}</i>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div
                          className="showmenu"
                          onClick={() => setShowMenuMobile(true)}
                        >
                          <button
                            type="button"
                            className="navbar-toggler open-btn"
                          >
                            <span className="icon-bar first-angle" />
                            <span className="icon-bar middle-angle" />
                            <span className="icon-bar last-angle" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-6">
                    <div className="navbar-header">
                      <Link className="navbar-brand" href="/">
                        <Image
                          src={"/images/logo-wb.svg"}
                          alt=""
                          width={showMenuMobile ? 100 : 50}
                          height={showMenuMobile ? 100 : 50}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-1 col-1">
                    <div
                      id="navbar"
                      className="collapse navbar-collapse navigation-holder"
                    >
                      <button className="menu-close">
                        <i className="ti-close"></i>
                      </button>
                      <ul className="nav navbar-nav mb-2 mb-lg-0">
                        {menuItens.map((item, index) => {
                          return (
                            <li key={index} className="menu-item-has-children">
                              <Link href={item.link}>{item.name}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
