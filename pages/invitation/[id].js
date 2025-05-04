import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import cx from "classnames";
import { Navbar } from "components/navbar/navbar";
import WpoPageTitle from "components/wpoPageTitle";
import Footer from "components/footer";

// Função de busca reutilizável
const fetchAPI = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Erro ao buscar dados");
  return response.json();
};

// Página principal
export default function Invitation() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: invitation,
    error,
    isLoading,
  } = useSWR(id ? `/api/v1/invitation/${id}` : null, fetchAPI);

  useEffect(() => {
    if (id && !isLoading && (error || !invitation)) {
      router.replace("/error404");
    }
  }, [id, isLoading, invitation, error, router]);

  if (isLoading || !invitation) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <WpoPageTitle
        title={invitation.name}
        subtitle1="Confirmação de Presença"
        subtitle2={invitation.pin_code}
      />
      <GuestCards id={id} />
    </>
  );
}

// Componente de cartões de convidados
function GuestCards({ id }) {
  const router = useRouter();

  const {
    data: guests,
    error,
    isLoading,
    mutate: mutateGuests,
  } = useSWR(id ? `/api/v1/guestsByInvitation/${id}` : null, fetchAPI);

  useEffect(() => {
    if (id && !isLoading && (error || !guests)) {
      router.replace("/error404");
    }
  }, [id, isLoading, guests, error, router]);

  if (isLoading || !guests) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  const handleChangeStatus = async (guestId, status) => {
    try {
      await fetch(`/api/v1/guests/${guestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation_status: status }),
      });

      mutateGuests((guests) =>
        guests.map((guest) =>
          guest.id === guestId
            ? { ...guest, confirmation_status: status }
            : guest,
        ),
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const renderStatusButton = (guest) => {
    const isConfirmed = guest.confirmation_status === "confirmed";
    const isDeclined = guest.confirmation_status === "declined";

    // Alterna entre 'confirmed' e 'declined'
    const newStatus = isConfirmed ? "declined" : "confirmed";
    const label = isConfirmed ? "Desconfirmar" : "Confirmar";

    return (
      <button
        className={cx("btn", {
          "btn-secondary": !guest.confirmation_status,
          "btn-danger": isConfirmed,
          "btn-success": isDeclined,
        })}
        onClick={() => handleChangeStatus(guest.id, newStatus)}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <div className="team-pg-area section-padding">
        <div className="container">
          <div className="team-info-wrap">
            <div className="row align-items-center">
              {guests.length > 0 ? (
                guests.map((guest) => (
                  <div key={guest.id} className="col-lg-6">
                    <div className="team-info-text">
                      <h2>{guest.name}</h2>
                      <ul>
                        {guest.email && (
                          <li>
                            Email: <span>{guest.email}</span>
                          </li>
                        )}
                        {guest.cell && (
                          <li>
                            Celular: <span>{guest.cell}</span>
                          </li>
                        )}
                        <li>
                          Situação:{" "}
                          <span>
                            {guest.confirmation_status || "Pendente"}
                            {guest.confirmation_status &&
                              ` - ${guest.confirmation_date}`}
                          </span>
                        </li>
                      </ul>
                      {renderStatusButton(guest)}
                    </div>
                  </div>
                ))
              ) : (
                <section className="wpo-page-title">
                  <div className="container">
                    <div className="row">
                      <div className="col col-xs-12">
                        <div className="wpo-breadcumb-wrap">
                          Nenhum convidado encontrado.
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
