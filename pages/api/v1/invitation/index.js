import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
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
  const returnIdInvitationDb = await invitationDb.createInvitation(
    request.body,
  );

  return response.status(201).json(returnIdInvitationDb[0]);
}
