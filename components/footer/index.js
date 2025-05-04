import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="wpo-site-footer wpo-site-footer-s2">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Links</h3>
                </div>
                <div className="link-wrap">
                  <ul>
                    <li>
                      <Link href="/gallery">Galeria</Link>
                    </li>
                    <li>
                      <Link href="/gifts">Lista de Presentes</Link>
                    </li>
                    <li>
                      <Link href="/rsvp">Confirmar Presença</Link>
                    </li>
                  </ul>
                  {false && (
                    <ul>
                      <li>
                        <Link href="/about">Sobre nós</Link>
                      </li>
                      <li>
                        <Link href="/service">Serviços</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contato</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col col-xl-6 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <Link className="logo" href="/">
                    Letícia e Ryan
                  </Link>
                </div>
                <p>
                  &#34;O meu amado é meu, e eu sou dele.&#34; - Cânticos 2:16
                </p>
                <ul>
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/in/ryangwalchmei/"
                    >
                      <FaLinkedin />
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/ryangwalchmei/"
                    >
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      target="_blank"
                      href="https://github.com/ryangwalchmei/"
                    >
                      <FaGithub />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="widget wpo-service-link-widget">
                <div className="widget-title">
                  <h3>Contato</h3>
                </div>
                <div className="contact-ft">
                  <p>ryan@gwalchmei.com.br</p>
                  <p>dev@gwalchmei.com.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
