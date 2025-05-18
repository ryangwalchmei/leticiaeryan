import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import guests from "models/guests";
import { createRouter } from "next-connect";

const router = createRouter();
router.get(getHandler);
router.all((request) => {
  const allowedMethods = ["GET"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const convidadosList = await guests.getGuests();
  return response.status(200).json(convidadosList);
}
