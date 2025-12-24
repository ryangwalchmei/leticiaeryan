import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import invitation from "models/invitation";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:invitations"), getHandler);
router.put(controller.canRequest("update:invitations"), putHandler);
router.delete(controller.canRequest("delete:invitations"), deleteHandler);
router.all((request) => {
  const allowedMethods = ["GET", "PUT", "DELETE"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const returnInvitation = await invitation.getInvitation(request.query.id);

  return response.status(200).json(returnInvitation);
}

async function putHandler(request, response) {
  const [updatedInvitation] = await invitation.updateInvitation(
    request.query.id,
    request.body,
  );

  return response.status(200).json(updatedInvitation);
}

async function deleteHandler(request, response) {
  await invitation.deleteInvitation(request.query.id);

  return response.status(204).end();
}
