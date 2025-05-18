import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import guests from "models/guests";
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
  const guestList = await guests.getGuests();
  return response.status(200).json(guestList);
}

async function postHandler(request, response) {
  const [newGuest] = await guests.createGuests(request.body);
  return response.status(201).json(newGuest);
}
