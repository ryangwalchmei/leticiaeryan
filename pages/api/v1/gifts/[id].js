import { MethodNotAllowedError } from "infra/errors/errors";
import { createRouter } from "next-connect";
import controller from "infra/controller";
import gifts from "models/gifts";

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
  const [returnGift] = await gifts.getGift(request.query.id);
  return response.status(200).json(returnGift);
}

async function putHandler(request, response) {
  const [returnGift] = await gifts.updateGift(request.query.id, request.body);
  return response.status(200).json(returnGift);
}

async function deleteHandler(request, response) {
  await gifts.deleteGift(request.query.id);
  return response.status(204).end();
}
