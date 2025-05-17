import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import { createRouter } from "next-connect";
import invitationFactory from "models/invitation";
const invitation = invitationFactory();

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

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const returnInvitation = await invitation.getInvitation(request.query.id);

  return response.status(200).json(returnInvitation[0]);
}

async function putHandler(request, response) {
  const updatedInvitation = await invitation.updateInvitation(
    request.query.id,
    request.body,
  );

  return response.status(200).json(updatedInvitation[0]);
}

async function deleteHandler(request, response) {
  const invitationDelete = await invitation.deleteInvitation(request.query.id);

  return response.status(204).json(invitationDelete);
}
