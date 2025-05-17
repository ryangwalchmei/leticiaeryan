import controller from "infra/controller";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import notificationFactory from "models/notifications";
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

const notification = notificationFactory();
export default router.handler(controller.errorHandlers);

// GET /api/notifications
async function getHandler(request, response) {
  const allNotifications = await notification.getNotifications();
  return response.status(200).json(allNotifications);
}

// POST /api/notifications
async function postHandler(request, response) {
  const { guest_id, title, message, type } = request.body;

  const propsRequired = ["guest_id", "title", "message", "type"];

  const missingProps = propsRequired.filter((prop) => {
    return (
      !Object.prototype.hasOwnProperty.call(request.body, prop) ||
      request.body[prop] === undefined ||
      request.body[prop] === null ||
      request.body[prop] === ""
    );
  });

  if (missingProps.length > 0) {
    throw new BadRequestError(
      `Missing required fields: ${missingProps.join(", ")}`,
    );
  }

  const newNotification = await notification.createNotifications({
    guest_id,
    title,
    message,
    type,
  });

  return response.status(201).json(newNotification[0]);
}
