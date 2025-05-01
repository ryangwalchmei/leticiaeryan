import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/navbar";
import useSWR from "swr";

async function fetchAPI(endpoint) {
  const response = await fetch(endpoint);
  const responseBody = await response.json();
  return responseBody;
}

export default function RSVP() {
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { data, error: swrError } = useSWR("/api/v1/invitation", fetchAPI);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pinCode.trim()) {
      setError("Por favor, insira um PIN CODE válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!data) {
        setError("Dados ainda não carregados. Tente novamente em breve.");
        return;
      }

      const foundInvitation = data.find((item) => item.pin_code === pinCode);

      if (!foundInvitation) {
        setError("PIN CODE inválido. Tente novamente.");
        return;
      }

      router.push(`/invitation/${foundInvitation.id}`);
    } catch (error) {
      console.error("Erro ao verificar o PIN CODE:", error);
      setError(
        "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (swrError) {
    return (
      <div>
        Erro ao carregar os dados. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="wpo-contact-title">
                <h2>Confirme sua presença aqui!</h2>
                <p>Por favor, insira o PIN CODE impresso no seu convite.</p>
              </div>
              <div className="wpo-contact-form-area">
                <form
                  onSubmit={handleSubmit}
                  className="contact-validation-active"
                >
                  <div className="row justify-content-center">
                    <div className="col col-lg-6 col-12">
                      <div className={`form-field ${error ? "error" : ""}`}>
                        <input
                          type="number"
                          name="pincode"
                          placeholder="Insira o PIN CODE aqui"
                          aria-label="PIN CODE do convite"
                          value={pinCode}
                          onChange={(e) => {
                            setPinCode(e.target.value.trim());
                            setError(null);
                          }}
                          required
                        />
                        {error && <div className="errorMessage">{error}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="submit-area">
                    <button
                      type="submit"
                      className="theme-btn"
                      disabled={loading}
                    >
                      {loading ? "Carregando" : "Avançar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <section className="wpo-contact-map-section">
          <div className="wpo-contact-map">
            <iframe
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-2.98652,-47.36198&z=17&output=embed"
            ></iframe>
          </div>
        </section>
      </section>
    </>
  );
}
