import controller from "infra/controller";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import notificationFactory from "models/notifications";
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
const notification = notificationFactory();

export default router.handler(controller.errorHandlers);

async function putHandler(request, response) {
  const id = request.query.id;

  const existingNotification = await notification.getNotificationById(id);

  if (!existingNotification || existingNotification.length === 0) {
    throw new NotFoundError("Notification not found");
  }

  if (request.body.id) {
    throw new BadRequestError("ID cannot be changed");
  }

  if (request.body.title === "") {
    throw new BadRequestError("Title is required");
  }
  if (existingNotification.code === "22P02") {
    throw new NotFoundError("Invalid ID");
  }

  const updatedNotification = await notification.markAsRead(id);
  return response.status(200).json(updatedNotification[0]);
}
