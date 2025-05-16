import { handleError } from "infra/errors/erroHandler";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "infra/errors/errors";
import notificationFactory from "models/notifications";
const notification = notificationFactory();

export default async function Notifications(request, response) {
  const allowedMethods = ["PUT"];
  const isPermited = allowedMethods.includes(request.method);

  try {
    if (!isPermited) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }
    switch (request.method) {
      case "PUT":
        return await putHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function putHandler(request, response) {
  const id = request.query.id;

  try {
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

    const updatedNotification = await notification.markAsRead(id);
    return response.status(200).json(updatedNotification[0]);
  } catch (error) {
    if (error.code === "22P02") {
      throw new NotFoundError("Invalid ID");
    }
    return handleError(error, request, response);
  }
}
