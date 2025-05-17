import controller from "infra/controller";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
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

const invitationDb = invitationFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const convidadosList = await invitationDb.getInvitations();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
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
}
