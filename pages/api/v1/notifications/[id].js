import notificationFactory from "models/notifications";
const notification = notificationFactory();

export default async function Notifications(request, response) {
  try {
    switch (request.method) {
      case "PUT":
        return await putHandler(request, response);
      default:
        response.setHeader("Allow", ["PUT"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function putHandler(request, response) {
  const id = request.query.id;

  try {
    const existingNotification = await notification.getNotificationById(id);

    if (!existingNotification || existingNotification.length === 0) {
      return response.status(404).json({ message: "Notification not found" });
    }

    if (request.body.id) {
      return response.status(400).json({ message: "ID cannot be changed" });
    }

    if (request.body.title === "") {
      return response.status(400).json({ message: "Title is required" });
    }

    const updatedNotification = await notification.markAsRead(id);
    return response.status(200).json(updatedNotification[0]);
  } catch (error) {
    if (error.code === "22P02") {
      console.log("INVALIDO", { id });
      return response.status(404).json({ message: "Invalid ID" });
    }

    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
