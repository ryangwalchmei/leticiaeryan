import Image from "next/image";
import style from "./style.module.css";

export default function InConstruction() {
  return (
    <>
      <div className={style.container}>
        <div className={style.contentContainer}>
          <div className={style.imageFolha}>
            <Image
              src="/images/folha1.svg" // Caminho relativo na pasta public
              alt="Meu avatar"
              width={150} // Largura da imagem
              height={150} // Altura da imagem
            />
          </div>
          <div className={style.gridCC}>
            <div className={style.contentgrid}>
              <div className={style.row}>
                <div className={style.title}>Letícia & Ryan</div>
              </div>
              <div className={style.row}>
                <p className={style.subTitile}>Vem novidade pela frente!</p>
              </div>
              <div className={style.row}>
                <p className={style.subtext}>
                  Estamos desenvolvendo o nosso site, em breve você poderá
                  acompanhar nosso álbum de fotos, confirmar sua presença e
                  visualizar a lista de presentes.
                </p>
              </div>
              <div className={style.row}>
                <div className={style.imageCircleRound}>
                  <Image
                    src="/images/roundClice.svg" // Caminho relativo na pasta public
                    alt="Meu avatar"
                    width={30} // Largura da imagem
                    height={30} // Altura da imagem
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.imageFlor}>
            <Image
              src="/images/flor1.svg" // Caminho relativo na pasta public
              alt="Meu avatar"
              width={150} // Largura da imagem
              height={150} // Altura da imagem
            />
          </div>
        </div>
      </div>
    </>
  );
}
