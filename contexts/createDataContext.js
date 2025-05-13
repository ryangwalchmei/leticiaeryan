import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";
import { useData } from "./getDataContext";
import fetchAPI from "./utils/fetchAPI";
import { showToast } from "components/toasts";
import { useNotifications } from "./notificationsContext";

const CreateDataContext = createContext();

export const CreateDataProvider = ({ children }) => {
  const { refresh } = useData();
  const { createNotification, refreshNotifications } = useNotifications();

  // Invitations
  async function createNewInvitation() {
    const { value: formValues } = await Swal.fire({
      title: "Novo Convite",
      html: `<input id="newInvite-name" class="swal2-input" placeholder="Nome do convidado">`,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("newInvite-name").value.trim();
        if (!name) {
          Swal.showValidationMessage("O nome é obrigatório!");
          return null;
        }
        return { name };
      },
    });

    if (formValues) {
      await fetchAPI(`/api/v1/invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      await refresh().refreshInvitations();
      await refresh().refreshGuests();

      showToast({
        icon: "success",
        title: "Criado!",
        text: "Convite foi criado com sucesso!",
      });
    }
  }

  async function toggleInvitationStatus(item) {
    const updatedStatus =
      item.status === "pendente"
        ? "entregue"
        : item.status === "entregue"
          ? "não entregue"
          : "pendente";

    try {
      await fetchAPI(`/api/v1/invitation/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      await refresh().refreshInvitations();

      showToast({
        icon: "success",
        title: "Atualizado!",
        text: `Status alterado para "${updatedStatus}".`,
      });
    } catch {
      showToast({ icon: "error", title: "Não atualizado!" });
    }
  }

  async function deleteInvitation(item) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Você tem certeza?",
      text: "Essa ação irá apagar um convite. Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await fetchAPI(`/api/v1/invitation/${item.id}`, {
        method: "DELETE",
      });

      await refresh().refreshInvitations();
      await refresh().refreshGuests();

      showToast({
        icon: "success",
        title: "Excluído!",
        text: "Convite excluído com sucesso!",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      showToast({
        icon: "error",
        title: "Cancelado!",
        text: "Convite não foi excluído!",
      });
    }
  }

  // Guests

  async function createGuestForInvitation(formValues) {
    console.log(formValues);

    try {
      if (formValues) {
        await fetchAPI(`/api/v1/guests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        await refresh().refreshGuests();
        showToast({
          icon: "success",
          title: "Convidado Criado!",
          text: "O convidado foi adicionado com sucesso.",
        });
      }
    } catch (error) {
      showToast({
        icon: "error",
        title: "Erro!",
        text: error.message || "Ocorreu um erro ao adicionar o convidado.",
      });
    }
  }

  async function toggleGuestConfirmationStatus(item, isShowToast) {
    let updatedStatus = null;
    if (item.confirmation_status === null) updatedStatus = "confirmed";
    else if (item.confirmation_status === "confirmed")
      updatedStatus = "declined";
    else updatedStatus = "confirmed";

    try {
      const response = await fetchAPI(`/api/v1/guests/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation_status: updatedStatus }),
      });

      if (!response.id)
        throw new Error("Erro ao mudar status de confirmação do convidado");

      await refresh().refreshInvitations();
      await refresh().refreshGuests();

      createNotification({
        guest_id: item.id,
        title:
          updatedStatus == "declined"
            ? "Presença Rejeitada"
            : updatedStatus == "confirmed"
              ? "Presença Confirmada"
              : "Presença marcada como pendente",
        message: `${item.name} - ${item.invitation.name} (${item.invitation.pin_code})`,
        type:
          updatedStatus == "declined"
            ? `alert`
            : updatedStatus == "confirmed"
              ? `success`
              : "info",
      });
      await refreshNotifications();

      if (isShowToast) {
        let textStatus = "";
        if (updatedStatus == "declined") textStatus = "rejeitado";
        if (updatedStatus == "confirmed") textStatus = "confirmado";
        showToast({
          icon: "success",
          title: "Atualizado!",
          text: `Convidado ${textStatus} com sucesso`,
        });
      }
    } catch (error) {
      showToast({
        icon: "error",
        title: "Erro!",
        text: error.message || "Ocorreu um erro ao atualizar o convidado.",
      });
    }
  }

  async function deleteGuest(item) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Você tem certeza?",
      text: "Essa ação irá apagar um convidado. Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Excluir!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await fetchAPI(`/api/v1/guests/${item.id}`, {
        method: "DELETE",
      });

      await refresh().refreshGuests();

      showToast({
        icon: "success",
        title: "Excluído!",
        text: "Convidado excluído com sucesso!",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      showToast({
        icon: "error",
        title: "Cancelado!",
        text: "Convidado não foi excluído!",
      });
    }
  }

  const values = {
    invitations: {
      createNewInvitation,
      toggleInvitationStatus,
      deleteInvitation,
    },
    guests: {
      createGuestForInvitation,
      toggleGuestConfirmationStatus,
      deleteGuest,
    },
    gifts: {},
  };

  return (
    <CreateDataContext.Provider value={values}>
      {children}
    </CreateDataContext.Provider>
  );
};

export const useCreateData = () => useContext(CreateDataContext);
