import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import gifts from "models/gifts";
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

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const giftsList = await gifts.getGifts();
  return response.status(200).json(giftsList);
}

async function postHandler(request, response) {
  const [giftCreated] = await gifts.createGifts(request.body);
  return response.status(201).json(giftCreated);
}
