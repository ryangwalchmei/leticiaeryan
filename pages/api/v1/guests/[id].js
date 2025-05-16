import { handleError } from "infra/errors/erroHandler";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import guestsFactory from "models/guests";
const guests = guestsFactory();

export default function Guests(request, response) {
  const allowedMethods = ["GET", "PUT", "DELETE"];
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
        return getHandler(request, response);
      case "PUT":
        return putHandler(request, response);
      case "DELETE":
        return deleteHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const returnGuests = await guests.getGuest(request.query.id);

    if (returnGuests.code === "22P02") {
      throw new NotFoundError("Invalid ID");
    }

    if (returnGuests.length === 0) {
      throw new NotFoundError("Guest is not found");
    }

    if (returnGuests.length === 1) {
      return response.status(200).json(returnGuests[0]);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function putHandler(request, response) {
  try {
    const returnGuest = await guests.getGuest(request.query.id);

    if (returnGuest.code === "22P02") {
      throw new NotFoundError("Invalid ID");
    }

    if (returnGuest.length === 0) {
      throw new NotFoundError("Guest not found");
    }

    if (request.body.id) {
      throw new BadRequestError("ID cannot be changed");
    }

    if (request.body.name === "") {
      throw new BadRequestError("Name is required");
    }

    if (returnGuest.length === 1) {
      const returnGuests = await guests.updateGuests(
        request.query.id,
        request.body,
      );

      return response.status(200).json(returnGuests[0]);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function deleteHandler(request, response) {
  try {
    const returnGuest = await guests.getGuest(request.query.id);

    if (returnGuest.code === "22P02") {
      throw new BadRequestError("Invalid ID");
    }

    if (returnGuest.length === 0) {
      throw new NotFoundError("Guest not found");
    }

    const returnGuests = await guests.deleteGuests(request.query.id);
    return response.status(204).json(returnGuests[0]);
  } catch (error) {
    return handleError(error, request, response);
  }
}
