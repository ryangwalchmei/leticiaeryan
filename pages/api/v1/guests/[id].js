import controller from "infra/controller";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import guestsFactory from "models/guests";
import { createRouter } from "next-connect";

const router = createRouter();
router.get(getHandler);
router.put(putHandler);
router.delete(deleteHandler);
router.all((request) => {
  const allowedMethods = ["GET", "PUT", "DELETE"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

const guests = guestsFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}

async function putHandler(request, response) {
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
}

async function deleteHandler(request, response) {
  const returnGuest = await guests.getGuest(request.query.id);

  if (returnGuest.code === "22P02") {
    throw new BadRequestError("Invalid ID");
  }

  if (returnGuest.length === 0) {
    throw new NotFoundError("Guest not found");
  }

  const returnGuests = await guests.deleteGuests(request.query.id);
  return response.status(204).json(returnGuests[0]);
}
