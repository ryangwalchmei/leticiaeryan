import Image from "next/image";

export default function Couple() {
  return (
    <section class="wpo-couple-section-s3 section-padding" id="couple">
      <div class="container-fluid">
        <div class="couple-area clearfix">
          <div class="row align-items-center">
            <div class="col col-xl-3 col-lg-4 col-12">
              <div class="text-grid">
                <div class="vector">
                  <Image
                    width={107}
                    height={172}
                    style={{ height: "auto" }}
                    src="/images/vector-groom-1.svg"
                    alt=""
                  />
                </div>
                <h3>Ryan Galvão</h3>
              </div>
            </div>
            <div class="col col-xl-6 col-lg-4 col-12">
              <div class="middle-couple-pic">
                <div class="middle-couple-pic-inner">
                  <Image
                    width={640}
                    height={640}
                    src="/images/photos/couple.jpg"
                    alt=""
                  />
                </div>
                <div class="couple-flower">
                  <Image
                    width={680}
                    height={303}
                    src="/images/couple-flower.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="col col-xl-3 col-lg-4 col-12">
              <div class="text-grid">
                <div class="vector">
                  <Image
                    width={107}
                    height={172}
                    style={{ height: "auto" }}
                    src="/images/vector-bride-2.svg"
                    alt=""
                  />
                </div>
                <h3>Letícia Vitória</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
