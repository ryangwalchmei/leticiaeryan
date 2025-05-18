import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import guests from "models/guests";
import { createRouter } from "next-connect";

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
  const [returnGuests] = await guests.getGuest(request.query.id);
  return response.status(200).json(returnGuests);
}

async function putHandler(request, response) {
  const [modifiedGuests] = await guests.updateGuests(
    request.query.id,
    request.body,
  );

  return response.status(200).json(modifiedGuests);
}

async function deleteHandler(request, response) {
  await guests.deleteGuests(request.query.id);
  return response.status(204).end();
}
