import { useData } from "../../context/dataContexts";
import { useCreateData } from "../../context/createDataContext";
import { useMenu } from "../../context/menuContext";
import React, { useEffect, useState } from "react";

export default function TableGuests() {
  const { selectedInvitationExternalId } = useMenu();
  const { mappedGuests, loadingData } = useData();
  const { guests } = useCreateData();

  const { deleteGuest, toggleGuestConfirmationStatus } = guests;
  const { isLoadingInvitations, isLoadingGuests } = loadingData;

  const [mappedGuestsFiltered, setMappedGuestsFiltered] = useState([]);

  useEffect(() => {
    if (!mappedGuests) return;

    if (selectedInvitationExternalId?.id) {
      const filtered = mappedGuests.filter(
        (item) => item.invitation_id === selectedInvitationExternalId.id,
      );
      setMappedGuestsFiltered(filtered);
    } else {
      setMappedGuestsFiltered(mappedGuests);
    }
  }, [selectedInvitationExternalId, mappedGuests]);

  const header = [
    { name: "Nome", textEnd: false },
    { name: "Celular", textEnd: false },
    { name: "Confirmação", textEnd: false },
    { name: "Convite/PinCode", textEnd: false },
    { name: "Convidado de", textEnd: false },
    { name: "Ações", textEnd: true },
  ];

  const actions = [
    {
      key: "edit",
      name: "Editar",
      action: () => {},
      hide: true,
    },
    {
      key: "delete",
      name: "Deletar",
      action: async (item) => await deleteGuest(item),
    },
    {
      key: "toggle",
      name: "Confirmar",
      action: (item) => toggleGuestConfirmationStatus(item),
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
            mappedGuestsFiltered.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.name}</td>
                <td>{item.cell}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleGuestConfirmationStatus(item)}
                >
                  {item.confirmation_status === null && (
                    <span className="badge bg-secondary">Pendente</span>
                  )}
                  {item.confirmation_status === "confirmed" && (
                    <span className="badge bg-success">Confirmado</span>
                  )}
                  {item.confirmation_status === "declined" && (
                    <span className="badge bg-danger">Rejeitado</span>
                  )}
                </td>
                <td>
                  {item.invitation?.name} - {item.invitation?.pin_code}
                </td>
                <td>{item.guest_of}</td>
                <td className="text-end">
                  {actions.map(
                    (actionObj, i) =>
                      !actionObj.hide && (
                        <button
                          key={i}
                          type="button"
                          className="btn text-secondary"
                          onClick={() => actionObj.action(item)}
                        >
                          {actionObj.name}
                        </button>
                      ),
                  )}
                </td>
              </tr>
            ))
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
