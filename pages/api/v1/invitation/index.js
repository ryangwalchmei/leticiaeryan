import { handleError } from "infra/errors/erroHandler";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import invitationFactory from "models/invitation";

const invitationDb = invitationFactory();

export default function Invitation(request, response) {
  const allowedMethods = ["GET", "POST"];
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
      case "POST":
        return postHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const convidadosList = await invitationDb.getInvitations();
    return response.status(200).json(convidadosList);
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function postHandler(request, response) {
  try {
    if (request.body.name === undefined) {
      throw new BadRequestError("Name is required");
    }

    if (request.body.name.length > 50) {
      throw new BadRequestError("Name is too long");
    }

    const returnIdInvitationDb = await invitationDb.createInvitation(
      request.body,
    );

    return response.status(201).json(returnIdInvitationDb[0]);
  } catch (error) {
    return handleError(error, request, response);
  }
}
