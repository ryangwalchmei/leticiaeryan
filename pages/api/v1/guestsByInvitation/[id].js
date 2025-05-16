import { handleError } from "infra/errors/erroHandler";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import guestInvitationFactory from "models/guestsInvitation";
import invitationFactory from "models/invitation";
import isValidUUID from "utils/uuidValidator";

const guestInvitation = guestInvitationFactory();
const invitation = invitationFactory();

export default async function Gift(request, response) {
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
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const { id } = request.query;

    if (!id) {
      throw new BadRequestError("invitation_id is required");
    }

    if (!isValidUUID(id)) {
      throw new BadRequestError("Invalid invitation_id");
    }

    const invitations = await invitation.getInvitation(id);

    if (
      !invitations ||
      invitations.length === 0 ||
      invitations.code === "22P02"
    ) {
      throw new NotFoundError("Not found invitation associated");
    }

    const guestsInvitation =
      (await guestInvitation.getGuestsByInvitationId(id)) || [];

    return response.status(200).json(guestsInvitation);
  } catch (error) {
    return handleError(error, request, response);
  }
}
