import { handleError } from "infra/errors/erroHandler";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import notificationFactory from "models/notifications";
const notification = notificationFactory();

export default async function Notifications(request, response) {
  const allowedMethods = ["GET", "POST", "PUT"];
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
      case "GET":
        return await getHandler(request, response);
      case "POST":
        return await postHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

// GET /api/notifications
async function getHandler(request, response) {
  try {
    const allNotifications = await notification.getNotifications();
    return response.status(200).json(allNotifications);
  } catch (error) {
    return handleError(error, request, response);
  }
}

// POST /api/notifications
async function postHandler(request, response) {
  try {
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
  } catch (error) {
    return handleError(error, request, response);
  }
}
