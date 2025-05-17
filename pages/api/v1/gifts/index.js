import controller from "infra/controller";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import giftsFactory from "models/gifts";
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

const giftsDb = giftsFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const giftsList = await giftsDb.getGifts();
  return response.status(200).json(giftsList);
}

async function postHandler(request, response) {
  const propsRequired = ["ext", "link", "title"];

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

  try {
    new URL(request.body.link);
  } catch {
    throw new BadRequestError("The link provided is not a valid URL.");
  }

  const returnIdGiftsDb = await giftsDb.createGifts(request.body);

  return response.status(201).json(returnIdGiftsDb[0]);
}
