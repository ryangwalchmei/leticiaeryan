import Image from "next/image";
import style from "./style.module.scss";

export default function InConstruction() {
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        {/* Imagem folha */}
        <div className={style.imageFolha}>
          <Image
            src="/images/folha1.svg" // Caminho relativo na pasta public
            alt="Folha decorativa"
            width={150} // Largura da imagem
            height={150} // Altura da imagem
            priority // Carrega a imagem antecipadamente
          />
        </div>

        {/* Grid de conteúdo */}
        <div className={style.gridCC}>
          <div className={style.contentgrid}>
            {/* Título */}
            <div className={style.row}>
              <h1 className={style.title}>Letícia & Ryan</h1>
            </div>
            {/* Subtítulo */}
            <div className={style.row}>
              <p className={style.subTitile}>Vem novidade pela frente!</p>
            </div>
            {/* Texto principal */}
            <div className={style.row}>
              <p className={style.subtext}>
                Estamos desenvolvendo o nosso site, em breve você poderá
                acompanhar nosso álbum de fotos, confirmar sua presença e
                visualizar a lista de presentes.
              </p>
            </div>
            {/* Imagem circular com animação */}
            <div className={style.row}>
              <div className={style.imageCircleRound}>
                <Image
                  src="/images/roundClice.svg"
                  alt="Ícone decorativo"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Imagem flor */}
        <div className={style.imageFlor}>
          <Image
            src="/images/flor1.svg"
            alt="Flor decorativa"
            width={150}
            height={150}
            priority
          />
        </div>
      </div>
    </div>
  );
}
