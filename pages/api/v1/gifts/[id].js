import { handleError } from "infra/errors/erroHandler";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import giftFactory from "models/gifts";
import isValidUUID from "utils/uuidValidator";
const gifts = giftFactory();

export default async function Gift(request, response) {
  const allowedMethods = ["GET", "PUT", "DELETE"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) {
    throw new MethodNotAllowedError({
      cause: new Error("Método não permitido"),
      method: request.method,
      allowedMethods,
    });
  }

  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      case "PUT":
        return await putHandler(request, response);
      case "DELETE":
        return await deleteHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    if (!isValidUUID(request.query.id)) {
      throw new BadRequestError("Invalid ID ");
    }
    const returnGift = await gifts.getGift(request.query.id);

    if (returnGift.code === "22P02") {
      throw new BadRequestError("Invalid ID");
    }

    if (returnGift.length === 0) {
      throw new NotFoundError("Gift is not found");
    }

    if (returnGift.length === 1) {
      return response.status(200).json(returnGift[0]);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function putHandler(request, response) {
  try {
    const propsRequired = ["title"];

    const missingProps = propsRequired.filter((prop) => {
      return (
        !Object.prototype.hasOwnProperty.call(request.body, prop) ||
        request.body[prop] === undefined ||
        request.body[prop] === null ||
        request.body[prop] === ""
      );
    });

    if (missingProps.length > 0) {
      throw new BadRequestError(
        `The following properties are required and are either missing or invalid: ${missingProps.join(", ")}`,
      );
    }

    if (!isValidUUID(request.query.id)) {
      throw new BadRequestError("Invalid ID");
    }

    const returnGift = await gifts.updateGift(request.query.id, request.body);

    if (returnGift.length === 0) {
      throw new NotFoundError("Gift is not found");
    }

    return response.status(200).json(returnGift[0]);
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function deleteHandler(request, response) {
  try {
    const { id } = request.query;

    if (!isValidUUID(id)) {
      throw new BadRequestError("Invalid ID");
    }

    const deleted = await gifts.deleteGift(id);

    if (!deleted || deleted.length === 0) {
      throw new NotFoundError("Gift is not found");
    }

    return response.status(204).send();
  } catch (error) {
    return handleError(error, request, response);
  }
}
