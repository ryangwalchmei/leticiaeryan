import { handleError } from "infra/errors/erroHandler";
import {
  BadRequestError,
  ForbiddenError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import invitationFactory from "models/invitation";
const invitation = invitationFactory();

export default function Invitation(request, response) {
  const allowedMethods = ["GET", "PUT", "DELETE"];
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
      case "PUT":
        return putHandler(request, response);
      case "DELETE":
        return deleteHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const returnInvitation = await invitation.getInvitation(request.query.id);

    if (returnInvitation.code === "22P02") {
      throw new BadRequestError("Invalid ID");
    }

    if (!returnInvitation || returnInvitation.length === 0) {
      throw new NotFoundError("Invitation not found");
    }

    return response.status(200).json(returnInvitation[0]);
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function putHandler(request, response) {
  try {
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
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function deleteHandler(request, response) {
  try {
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
  } catch (error) {
    return handleError(error, request, response);
  }
}
