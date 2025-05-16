import { handleError } from "infra/errors/erroHandler";
import { MethodNotAllowedError } from "infra/errors/errors";
import guestFactory from "models/guests";

const guestDb = guestFactory();

export default async function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermited = allowedMethods.includes(request.method);

  try {
    if (!isPermited) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
    }

    throw new Error({ message: "Method not allowed" });
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const convidadosList = await guestDb.getGuests();
    return response.status(200).json(convidadosList);
  } catch (error) {
    return handleError(error, request, response);
  }
}
