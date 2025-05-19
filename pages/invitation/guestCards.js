import { useCreateData } from "contexts/createDataContext";
import fetchAPI from "contexts/utils/fetchAPI";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useData } from "contexts/getDataContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Box, Button } from "@mui/material";

function InfoLine({ label, value }) {
  return value ? (
    <li>
      {label}: <span>{value}</span>
    </li>
  ) : null;
}

export default function GuestCards({ id }) {
  const router = useRouter();
  const { toggleGuestConfirmationStatus } = useCreateData().guests;
  const { invitationList } = useData();

  const [mappedGuests, setMappedGuests] = useState([]);

  const {
    data: guests,
    error,
    isLoading,
    mutate: mutateGuests,
  } = useSWR(id ? `/api/v1/guestsByInvitation/${id}` : null, fetchAPI);

  useEffect(() => {
    if (guests) {
      const guestsMap = [...guests]
        .map((guest) => ({
          ...guest,
          invitation:
            invitationList.find((inv) => inv.id === guest.invitation_id) || {},
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setMappedGuests(guestsMap);
    }
  }, [guests, invitationList]);

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

  async function handleChangeStatus(guestToggle, status) {
    try {
      const newStatus = status;

      toggleGuestConfirmationStatus(guestToggle);

      mutateGuests(
        (prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === guestToggle.id
              ? {
                  ...guest,
                  confirmation_status: newStatus,
                  confirmation_date:
                    newStatus === "confirmed" ? new Date().toISOString() : null,
                }
              : guest,
          ),
        false,
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  }

  const renderStatusButton = (guest) => {
    const isConfirmed = guest.confirmation_status === "confirmed";
    const isDeclined = guest.confirmation_status === "declined";

    return (
      <Box sx={{ "& button": { m: 1 } }}>
        <Button
          color="primary"
          hidden={isConfirmed}
          aria-label={`Alterar status de ${guest.name}`}
          onClick={() => handleChangeStatus(guest, "confirmed")}
          variant="outlined"
        >
          Confirmar
        </Button>
        <Button
          color="error"
          hidden={isDeclined}
          aria-label={`Alterar status de ${guest.name}`}
          onClick={() => handleChangeStatus(guest, "declined")}
          variant="outlined"
        >
          Desconfirmar
        </Button>
      </Box>
    );
  };

  return (
    <div className="team-pg-area section-padding">
      <div className="container">
        <div className="team-info-wrap">
          <div className="row align-items-center">
            {mappedGuests.length > 0 ? (
              mappedGuests.map((guest) => (
                <div key={guest.id} className="col-lg-6">
                  <div className="team-info-text">
                    <h2>{guest.name}</h2>
                    <ul>
                      <InfoLine label="Email" value={guest.email} />
                      <InfoLine label="Celular" value={guest.cell} />
                      <li>
                        Situação:{" "}
                        {guest.confirmation_status === "confirmed"
                          ? "Confirmado"
                          : guest.confirmation_status === "declined"
                            ? "Não comparecerá"
                            : "Aguardando confirmação"}
                        <span style={{ fontWeight: "bold" }}>
                          {guest.confirmation_status === "confirmed" &&
                            guest.confirmation_status &&
                            ` - ${formatDistanceToNow(
                              new Date(guest.confirmation_date),
                              {
                                addSuffix: true,
                                locale: ptBR,
                              },
                            )}`}
                        </span>
                      </li>
                    </ul>
                    {renderStatusButton(guest)}
                  </div>
                </div>
              ))
            ) : (
              <section className="h2">
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
  );
}
