import { useState } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaHome,
  FaGifts,
  FaPhotoVideo,
  FaPhone,
} from "react-icons/fa";

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const menuItens = [
    { name: "Home", link: "/landing2", icon: <FaHome /> },
    { name: "Lista de Presentes", link: "/gifts", icon: <FaGifts /> },
    { name: "Galeria de Fotos", link: "/gallery", icon: <FaPhotoVideo /> },
    { name: "Contato", link: "/contact", icon: <FaPhone /> },
  ];
  return (
    <>
      <div className="fixed-navbar ">
        <header id="header">
          <div className="wpo-site-header wpo-header-style-3">
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
                      <a className="navbar-brand" href="/home">
                        Letícia e Ryan
                      </a>
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
