import {
  ConflictError,
  NotFoundError,
  ServiceError,
  UnauthorizedError,
  ValidationError,
} from "infra/errors/errors";

export default async function fetchAPI(endpoint, options) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      credentials: "include",
    });

    let errorBody = null;
    if (!response.ok) {
      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: "Erro desconhecido" };
      }

      const msg = errorBody.message || "Erro ao se comunicar com o servidor.";

      switch (response.status) {
        case 400:
          throw new ValidationError({
            message: "",
            action: "",
          });
        case 401:
        case 403:
          throw new UnauthorizedError(msg);
        case 404:
          throw new NotFoundError(msg);
        case 409:
          throw new ConflictError(msg);
        case 500:
        default:
          throw new ServiceError(msg);
      }
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
    console.error(error);
    throw error;
  }
}
