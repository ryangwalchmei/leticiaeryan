import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import notifications from "models/notification";
import { createRouter } from "next-connect";

const router = createRouter();

router.put(putHandler);
router.all((request) => {
  const allowedMethods = ["PUT"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function putHandler(request, response) {
  const [updatedNotification] = await notifications.markAsRead(request);
  return response.status(200).json(updatedNotification);
}
