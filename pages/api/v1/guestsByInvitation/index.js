import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import guests from "models/guest";
import { createRouter } from "next-connect";

const router = createRouter();
router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:guest:all"), getHandler);
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
