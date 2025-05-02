const { default: Swal } = require("sweetalert2");

export default async function fetchAPI(endpoint, options) {
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
