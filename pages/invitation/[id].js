import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import cx from "classnames";
import { Navbar } from "components/navbar/navbar";

async function fetchAPI(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados");
  }
  const responseBody = await response.json();
  return responseBody;
}

export default function Invitation() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data, error } = useSWR(
    id ? `/api/v1/invitation/${id}` : null,
    fetchAPI,
  );

  useEffect(() => {
    if (id && !isLoading && (error || !data)) {
      router.replace("/error404");
    }
  }, [id, isLoading, data, error, router]);
  if (isLoading || !data) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  const invitation = data;

  return (
    <>
      <Navbar />
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>{invitation.name}</h2>
                <ol className="wpo-breadcumb-wrap">
                  <li>
                    <span>Confirmação de Presença</span>
                  </li>
                  <li>
                    <span>{invitation.pin_code}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GuestCards id={id} />
    </>
  );
}

function GuestCards({ id }) {
  const {
    isLoading,
    data: guests,
    mutate: mutateGuests,
    error,
  } = useSWR(id ? `/api/v1/guestsByInvitation/${id}` : null, fetchAPI);

  const router = useRouter();

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation_status: status }),
      });

      mutateGuests(
        (currentGuests) =>
          currentGuests.map((guest) =>
            guest.id === guestId
              ? { ...guest, confirmation_status: status }
              : guest,
          ),
        false,
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="team-pg-area section-padding">
      <div className="container">
        <div className="team-info-wrap">
          <div className="row align-items-center">
            {guests.length > 0 &&
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
                          Cell: <span>{guest.cell}</span>
                        </li>
                      )}
                      <li>
                        Situação:{" "}
                        <span>
                          {guest.confirmation_status || "Pendente"}{" "}
                          {guest.confirmation_status &&
                            `- ${guest.confirmation_date}`}
                        </span>
                      </li>
                    </ul>
                    <div>
                      <button
                        className={cx("btn", {
                          "btn-secondary": guest.confirmation_status === null,
                          "btn-danger":
                            guest.confirmation_status === "CONFIRMED",
                          "btn-success":
                            guest.confirmation_status === "REJECTED",
                        })}
                        onClick={() => {
                          const newStatus =
                            guest.confirmation_status === null ||
                            guest.confirmation_status === "REJECTED"
                              ? "CONFIRMED"
                              : "REJECTED";
                          handleChangeStatus(guest.id, newStatus);
                        }}
                      >
                        {guest.confirmation_status === null && "Confirmar"}
                        {guest.confirmation_status === "REJECTED" &&
                          "Confirmar"}
                        {guest.confirmation_status === "CONFIRMED" &&
                          "Desconfirmar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {guests.length === 0 && (
              <section className="wpo-page-title">
                <div className="container">
                  <div className="row">
                    <div className="col col-xs-12">
                      <div className="wpo-breadcumb-wrap">Error</div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
