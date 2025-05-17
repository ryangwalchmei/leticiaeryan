import controller from "infra/controller";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import guestFactory from "models/guests";
import invitationFactory from "models/invitation";
import { createRouter } from "next-connect";

const router = createRouter();
router.get(getHandler);
router.post(postHandler);
router.all((request) => {
  const allowedMethods = ["GET", "POST"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

const guestDb = guestFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const convidadosList = await guestDb.getGuests();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
  if (request.body.name === undefined || request.body.name === "") {
    throw new BadRequestError("Name is required");
  }

  if (request.body.name.length > 50) {
    throw new BadRequestError("Name is too long");
  }

  const invitations = await invitationFactory().getInvitation(
    request.body.invitation_id,
  );

  if (invitations.code === "22P02") {
    throw new BadRequestError("Invalid ID");
  }

  console.log({ RESPOSTA: invitations.code });

  if (invitations.length === 0 || !invitations) {
    throw new BadRequestError("Invalid invitation_id");
  }

  const returnIdGuestDb = await guestDb.createGuests(request.body);

  return response.status(201).json(returnIdGuestDb[0]);
}
