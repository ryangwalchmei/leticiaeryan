import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import giftFactory from "models/gifts";
import isValidUUID from "utils/uuidValidator";
import { createRouter } from "next-connect";
import controller from "infra/controller";

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

const gifts = giftFactory();
export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}

async function putHandler(request, response) {
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
}

async function deleteHandler(request, response) {
  const { id } = request.query;

  if (!isValidUUID(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const deleted = await gifts.deleteGift(id);

  if (!deleted || deleted.length === 0) {
    throw new NotFoundError("Gift is not found");
  }

  return response.status(204).send();
}
