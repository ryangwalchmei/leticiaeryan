import guestsFactory from "models/guests";
const guests = guestsFactory();

export default function Guests(request, response) {
  try {
    switch (request.method) {
      case "GET":
        return getHandler(request, response);
      case "PUT":
        return putHandler(request, response);
      case "DELETE":
        return deleteHandler(request, response);
      default:
        response.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function getHandler(request, response) {
  const returnGuests = await guests.getGuest(request.query.id);

  if (returnGuests.code === "22P02") {
    return response.status(404).json({ message: "Invalid ID" });
  }

  if (returnGuests.length === 0) {
    return response.status(404).json({});
  }

  if (returnGuests.length === 1) {
    return response.status(200).json(returnGuests[0]);
  }
}

async function putHandler(request, response) {
  try {
    const returnGuest = await guests.getGuest(request.query.id);

    if (returnGuest.code === "22P02") {
      return response.status(404).json({ message: "Invalid ID" });
    }

    if (returnGuest.length === 0) {
      return response.status(404).json({ message: "Guest not found" });
    }

    if (request.body.id) {
      return response.status(400).json({ message: "ID cannot be changed" });
    }

    if (request.body.name === "") {
      return response.status(400).json({ message: "Name is required" });
    }

    if (returnGuest.length === 1) {
      const returnGuests = await guests.updateGuests(
        request.query.id,
        request.body,
      );

      return response.status(200).json(returnGuests[0]);
    }
  } catch (error) {
    return response.status(404).json(error);
  }
}

async function deleteHandler(request, response) {
  const returnGuest = await guests.getGuest(request.query.id);

  if (returnGuest.code === "22P02") {
    return response.status(404).json({ message: "Invalid ID" });
  }

  if (returnGuest.length === 0) {
    return response.status(404).json({ message: "Guest not found" });
  }

  const returnGuests = await guests.deleteGuests(request.query.id);
  return response.status(204).json(returnGuests[0]);
}
