import notificationFactory from "models/notifications";
const notification = notificationFactory();

export default async function Notifications(request, response) {
  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      case "POST":
        return await postHandler(request, response);
      default:
        response.setHeader("Allow", ["GET", "POST", "PUT"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /api/notifications
async function getHandler(request, response) {
  try {
    const allNotifications = await notification.getNotifications();
    return response.status(200).json(allNotifications);
  } catch (error) {
    console.error("GET Error:", error);
    return response
      .status(500)
      .json({ message: "Failed to fetch notifications" });
  }
}

// POST /api/notifications
async function postHandler(request, response) {
  try {
    const { guest_id, title, message, type } = request.body;

    // Validação básica
    if (!guest_id || !title || !message || !type) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    const newNotification = await notification.createNotifications({
      guest_id,
      title,
      message,
      type,
    });

    return response.status(201).json(newNotification[0]);
  } catch (error) {
    console.error("POST Error:", error);
    return response
      .status(500)
      .json({ message: "Failed to create notification" });
  }
}
