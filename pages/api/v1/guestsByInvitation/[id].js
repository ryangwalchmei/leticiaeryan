import controller from "infra/controller";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import guestInvitationFactory from "models/guestsInvitation";
import invitationFactory from "models/invitation";
import isValidUUID from "utils/uuidValidator";
import { createRouter } from "next-connect";

const router = createRouter();
router.get(getHandler);
router.all((request) => {
  const allowedMethods = ["GET"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

const guestInvitation = guestInvitationFactory();
const invitation = invitationFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}
