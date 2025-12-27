import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import guests from "models/guest";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:guests"), getHandler);
router.put(controller.canRequest("update:guests"), putHandler);
router.delete(controller.canRequest("delete:guests"), deleteHandler);
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
  const returnGuests = await guests.getGuest(request.query.id);
  return response.status(200).json(returnGuests);
}

async function putHandler(request, response) {
  const modifiedGuests = await guests.updateGuests(
    request.query.id,
    request.body,
  );

  return response.status(200).json(modifiedGuests);
}

async function deleteHandler(request, response) {
  await guests.deleteGuests(request.query.id);
  return response.status(204).end();
}
