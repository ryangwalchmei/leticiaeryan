import guestsFactory from "models/guests";
const guests = guestsFactory();

export default function Guests(request, response) {
  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    } else if (request.method === "PUT") {
      return putHandler(request, response);
    } else if (request.method === "DELETE") {
      return deleteHandler(request, response);
    }
  } catch (error) {
    console.log("Error");
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
  const returnGuests = await guests.updateGuests(
    request.query.id,
    request.body,
  );

  return response.status(200).json(returnGuests[0]);
}

async function deleteHandler(request, response) {
  const returnGuests = await guests.deleteGuests(request.query.id);
  return response.status(204).json(returnGuests[0]);
}
