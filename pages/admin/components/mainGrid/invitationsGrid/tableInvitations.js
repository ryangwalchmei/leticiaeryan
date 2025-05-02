import { IconButton } from "@mui/material";
import { LuRefreshCcwDot } from "react-icons/lu";
import { FaPeopleLine } from "react-icons/fa6";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import React from "react";
import { useData } from "contexts/getDataContext";
import { useMenu } from "contexts/menuContext";
import { useCreateData } from "contexts/createDataContext";
import ModalAddGuestInInvitation from "./modalAddGuestInInvitation";

export default function TableInvitations() {
  const { confirmationSummary, mappedInvitations, loadingData } = useData();
  const { setSelectedInvitationExternalId, setSelectedMenu } = useMenu();
  const { invitations } = useCreateData();

  const { isLoadingInvitations, isLoadingGuests } = loadingData;

  // eslint-disable-next-line no-unused-vars
  const [selectedInvitation, setInvitationSelected] = React.useState({});
  const [openModalCreateGuestInInvitation, setIsCreateGuestModalOpen] =
    React.useState(false);

  const openCreateGuestModal = (item) => {
    setIsCreateGuestModalOpen(true);
    setInvitationSelected(item);
  };

  const closeCreateGuestModal = () => setIsCreateGuestModalOpen(false);

  const handleNavigateToGuestOfInvitation = (item) => {
    setSelectedInvitationExternalId(item);

    setInvitationSelected(item);
    setSelectedMenu("Convidados");
  };

  let actions = [
    {
      name: "Mostrar Convidados",
      action: handleNavigateToGuestOfInvitation,
      Icon: FaPeopleLine,
      color: "",
    },
    {
      name: "Deletar",
      action: invitations.deleteInvitation,
      Icon: FaTrash,
      color: "error",
    },
    {
      name: "Mudar status de entrega",
      action: invitations.toggleInvitationStatus,
      Icon: LuRefreshCcwDot,
      color: "secondary",
    },
    {
      name: "Adicionar Convidado",
      action: openCreateGuestModal,
      Icon: FaUserPlus,
      color: "success",
    },
  ];

  const header = [
    { name: "PinCode", textEnd: false },
    { name: "Nome", textEnd: false },
    { name: `Pessoas (${confirmationSummary.guest.total})`, textEnd: false },
    { name: "Status", textEnd: false },
    { name: "Ação", textEnd: true },
  ];

  const statusMap = {
    pendente: { label: "Pendente", class: "bg-secondary" },
    entregue: { label: "Entregue", class: "bg-success" },
    "não entregue": { label: "Não entregue", class: "bg-danger" },
  };

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
          ) : mappedInvitations.length > 0 ? (
            mappedInvitations?.map((item, index) => {
              const status = statusMap[item.status] || {
                label: "Desconhecido",
                class: "bg-dark",
              };
              return (
                <tr key={item.id || index}>
                  <td>{item.pin_code}</td>
                  <td>{item.name}</td>
                  <td>{item.guests?.length ?? 0}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => actions[2]?.action(item)}
                  >
                    <span className={`badge ${status.class}`}>
                      {status.label} <LuRefreshCcwDot size={22} />
                    </span>
                  </td>
                  <td className="text-end">
                    {actions?.map((actionObj, i) => {
                      if (actionObj.hidInActions) return null;
                      return (
                        <IconButton
                          key={i}
                          onClick={() => actionObj.action(item)}
                          aria-label={actionObj.name}
                          color={actionObj.color}
                          variant="outlined"
                        >
                          <actionObj.Icon />
                        </IconButton>
                      );
                    })}
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
      <ModalAddGuestInInvitation
        open={openModalCreateGuestInInvitation}
        close={closeCreateGuestModal}
        selectedInvitation={selectedInvitation}
      />
    </div>
  );
}
