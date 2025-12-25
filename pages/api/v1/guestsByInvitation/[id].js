import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import invitation from "models/invitation";
import { createRouter } from "next-connect";

const router = createRouter();
router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:guest:invitation"), getHandler);
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
  const guests = await invitation.getInvitationGuests(request.query.id);
  return response.status(200).json(guests);
}
