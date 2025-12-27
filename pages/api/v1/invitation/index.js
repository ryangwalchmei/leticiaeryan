import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import invitation from "models/invitation";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:invitations"), getHandler);
router.post(controller.canRequest("create:invitations"), postHandler);
router.all((request) => {
  const allowedMethods = ["GET", "POST"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const convidadosList = await invitation.getInvitations();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
  const returnIdInvitationDb = await invitation.createInvitation(request.body);

  return response.status(201).json(returnIdInvitationDb);
}
