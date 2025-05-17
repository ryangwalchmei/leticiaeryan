import controller from "infra/controller";
import {
  BadRequestError,
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
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

  if (returnInvitation.code === "22P02") {
    throw new BadRequestError("Invalid ID");
  }

  if (!returnInvitation || returnInvitation.length === 0) {
    throw new NotFoundError("Invitation not found");
  }

  return response.status(200).json(returnInvitation[0]);
}

async function putHandler(request, response) {
  const returnInvitation = await invitation.getInvitation(request.query.id);

  if (returnInvitation.code === "22P02") {
    throw new BadRequestError("Invalid ID");
  }

  if (returnInvitation.length === 0) {
    throw new BadRequestError("Invitation not found");
  }

  if (request.body.id) {
    throw new BadRequestError("ID cannot be changed");
  }

  if (request.body.name === "") {
    throw new BadRequestError("Name is required");
  }

  if (request.body.pin_code) {
    throw new ForbiddenError("Pin code cannot be updated");
  }

  if (returnInvitation.length === 1) {
    const updatedInvitation = await invitation.updateInvitation(
      request.query.id,
      request.body,
    );

    return response.status(200).json(updatedInvitation[0]);
  }
}

async function deleteHandler(request, response) {
  const returnInvitation = await invitation.getInvitation(request.query.id);

  if (returnInvitation.code === "22P02") {
    throw new BadRequestError("Invalid ID");
  }

  if (returnInvitation.length === 0) {
    throw new BadRequestError("Invitation not found");
  }

  await invitation.deleteInvitation(request.query.id).then(() => {
    return response.status(204).json(returnInvitation[0]);
  });
}
