import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";
import { useData } from "./getDataContext";

const CreateDataContext = createContext();

async function fetchAPI(endpoint, options) {
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: "Erro desconhecido" };
      }
      throw new Error(
        errorBody.message || "Ocorreu um erro ao se comunicar com o servidor.",
      );
    }

    if (response.status === 204) {
      return null;
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  } catch (error) {
    Swal.fire({
      title: "Erro!",
      text: error.message || "Algo deu errado.",
      icon: "error",
      confirmButtonText: "OK",
    });

    throw error;
  }
}

export const CreateDataProvider = ({ children }) => {
  const { refresh } = useData();

  // Invitations
  async function createNewInvitation() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

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

      swalWithBootstrapButtons.fire({
        title: "Criado!",
        text: "Convite criado com sucesso!",
        icon: "success",
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

      await Swal.fire({
        title: "Atualizado!",
        text: `Status alterado para "${updatedStatus}".`,
        icon: "success",
      });
    } catch {
      // Erro já tratado no fetchAPI
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

      await swalWithBootstrapButtons.fire({
        title: "Excluído!",
        text: "Convite excluído com sucesso!",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Convite não foi excluído!",
        icon: "error",
      });
    }
  }

  // Guests

  async function createGuestForInvitation(formValues) {
    try {
      if (formValues) {
        await fetchAPI(`/api/v1/guests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        await refresh().refreshGuests();

        await Swal.fire({
          title: "Convidado Criado!",
          text: "O convidado foi adicionado com sucesso.",
          icon: "success",
        });
      }
    } catch (error) {
      // O erro já será tratado pelo fetchAPI, mas podemos personalizar a mensagem se necessário
      Swal.fire({
        title: "Erro!",
        text: error.message || "Ocorreu um erro ao adicionar o convidado.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  async function toggleGuestConfirmationStatus(item) {
    let updatedStatus = null;
    if (item.confirmation_status === null) updatedStatus = "confirmed";
    else if (item.confirmation_status === "confirmed")
      updatedStatus = "declined";
    else updatedStatus = "confirmed";

    try {
      await fetchAPI(`/api/v1/guests/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmation_status: updatedStatus }),
      });

      await refresh().refreshInvitations();
      await refresh().refreshGuests();

      await Swal.fire({
        title: "Atualizado!",
        text: `Status de confirmação alterado para "${updatedStatus}".`,
        icon: "success",
      });
    } catch {
      // Erro já tratado no fetchAPI
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

      await swalWithBootstrapButtons.fire({
        title: "Excluído!",
        text: "Convidado excluído com sucesso!",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Convidado não foi excluído!",
        icon: "error",
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
