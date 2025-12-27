import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import notifications from "models/notification";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:notifications"), getHandler);
router.post(controller.canRequest("create:notifications"), postHandler);
router.all((request) => {
  const allowedMethods = ["GET", "POST"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

// GET /api/notifications
async function getHandler(request, response) {
  const allNotifications = await notifications.getNotifications();
  return response.status(200).json(allNotifications);
}

// POST /api/notifications
async function postHandler(request, response) {
  const newNotification = await notifications.createNotifications(request.body);
  return response.status(201).json(newNotification);
}
