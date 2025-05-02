import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { FaTrash, FaUserEdit, FaCheck } from "react-icons/fa";
import { useData } from "contexts/getDataContext";
import { useMenu } from "contexts/menuContext";
import { useCreateData } from "contexts/createDataContext";

export default function TableGuests() {
  const { selectedInvitationExternalId } = useMenu();
  const { mappedGuests, loadingData } = useData();
  const { guests } = useCreateData();

  const { deleteGuest, toggleGuestConfirmationStatus } = guests;
  const { isLoadingInvitations, isLoadingGuests } = loadingData;

  const [mappedGuestsFiltered, setMappedGuestsFiltered] = useState([]);

  useEffect(() => {
    if (!mappedGuests || !Array.isArray(mappedGuests)) return;

    const filtered = selectedInvitationExternalId?.id
      ? mappedGuests.filter(
          (item) => item.invitation_id === selectedInvitationExternalId.id,
        )
      : mappedGuests;

    setMappedGuestsFiltered(filtered);
  }, [mappedGuests, selectedInvitationExternalId?.id, isLoadingGuests]);

  const header = [
    { name: "Nome", textEnd: false },
    { name: "Celular", textEnd: false },
    { name: "Confirmação", textEnd: false },
    { name: "Convite/PinCode", textEnd: false },
    { name: "Convidado de", textEnd: false },
    { name: "Ações", textEnd: true },
  ];

  const statusMap = {
    null: { label: "Pendente", class: "bg-secondary" },
    confirmed: { label: "Confirmado", class: "bg-success" },
    declined: { label: "Rejeitado", class: "bg-danger" },
    pending: { label: "Pendente", class: "bg-secondary" },
  };

  const actions = [
    {
      name: "Editar",
      action: () => {},
      Icon: FaUserEdit,
      color: "primary",
      hidden: true,
    },
    {
      name: "Deletar",
      action: async (item) => await deleteGuest(item),
      Icon: FaTrash,
      color: "error",
    },
    {
      name: "Confirmar",
      action: (item) => toggleGuestConfirmationStatus(item),
      Icon: FaCheck,
      color: "success",
    },
  ];

  return (
    <div className="table-responsive">
      <table className="table table-bordered mb-0 table-centered">
        <thead>
          <tr>
            {header.map((item, index) => (
              <th className={item.textEnd ? "text-end" : ""} key={index}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoadingInvitations || isLoadingGuests ? (
            <tr>
              <td colSpan={header.length} className="text-center">
                Carregando...
              </td>
            </tr>
          ) : mappedGuestsFiltered.length > 0 ? (
            mappedGuestsFiltered.map((item, index) => {
              const statusKey = item.confirmation_status ?? "pending";
              const status = statusMap[statusKey];

              return (
                <tr key={item.id || index}>
                  <td>{item.name}</td>
                  <td>{item.cell}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => actions[2]?.action(item)}
                  >
                    <span className={`badge ${status?.class}`}>
                      {status?.label}
                    </span>
                  </td>
                  <td>
                    {item.invitation?.name} - {item.invitation?.pin_code}
                  </td>
                  <td>{item.guest_of}</td>
                  <td className="text-end">
                    {actions.map(
                      (actionObj, i) =>
                        !actionObj.hidden && (
                          <IconButton
                            key={i}
                            aria-label={actionObj.name}
                            color={actionObj.color}
                            variant="outlined"
                            onClick={() => actionObj.action(item)}
                          >
                            <actionObj.Icon />
                          </IconButton>
                        ),
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={header.length} className="text-center">
                Nenhum convidado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
