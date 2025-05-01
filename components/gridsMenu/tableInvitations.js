import { Fab } from "@mui/material";
import { LuRefreshCcwDot } from "react-icons/lu";
import { FaPeopleLine } from "react-icons/fa6";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import { useMenu } from "../../context/menuContext";
import React from "react";
import ModalAddGuestInInvitation from "../../components/gridsMenu/internals/addGuestInInvitationModal";
import { useCreateData } from "../../context/createDataContext";
import { useData } from "../../context/dataContexts";

export default function TableInvitations() {
  const { confirmationSummary, mappedInvitations, loadingData } = useData();
  const { setSelectedInvitationExternalId, setSelectedMenu } = useMenu();
  const { invitations } = useCreateData();
  const { isLoadingInvitations, isLoadingGuests } = loadingData;

  const [openModalCreateGuestInInvitation, setIsCreateGuestModalOpen] =
    React.useState(false);
  const [selectedInvitation, setInvitationSelected] = React.useState({});

  const handleisShowGuestsModalOpen = (item) => {
    setSelectedInvitationExternalId(item);

    setInvitationSelected(item);
    setSelectedMenu("Convidados");
  };

  const openCreateGuestModal = (item) => {
    setIsCreateGuestModalOpen(true);
    setInvitationSelected(item);
  };

  const closeCreateGuestModal = () => setIsCreateGuestModalOpen(false);

  let actions = [
    {
      name: "Mostrar Convidados",
      action: handleisShowGuestsModalOpen,
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
            mappedInvitations?.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.pin_code}</td>
                <td>{item.name}</td>
                <td>{item.guests?.length ?? 0}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => actions[2]?.action(item)}
                >
                  {item.status === "pendente" && (
                    <span className="badge bg-secondary">
                      Pendente <LuRefreshCcwDot size={22} />
                    </span>
                  )}
                  {item.status === "entregue" && (
                    <span className="badge bg-success">
                      Entregue <LuRefreshCcwDot size={22} />
                    </span>
                  )}
                  {item.status === "não entregue" && (
                    <span className="badge bg-danger">
                      Não entregue <LuRefreshCcwDot size={22} />
                    </span>
                  )}
                </td>
                <td className="text-end">
                  {actions?.map((actionObj, i) => {
                    if (actionObj.hidInActions) return null;
                    return (
                      <Fab
                        popover="asd"
                        key={i}
                        onClick={() => actionObj.action(item)}
                        size="small"
                        color={actionObj.color}
                      >
                        {actionObj.Icon()}
                      </Fab>
                    );
                  })}
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

      <ModalAddGuestInInvitation
        open={openModalCreateGuestInInvitation}
        close={closeCreateGuestModal}
        selectedInvitation={selectedInvitation}
      />
    </div>
  );
}
