import guestFactory from "../../../../models/guests";
import invitationFactory from "../../../../models/invitation";

const guestDb = guestFactory();

export default function guest(request, response) {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error({ message: "Method Not Allowed" });

  try {
    switch (request.method) {
      case "GET":
        return getHandler(request, response);
      case "POST":
        return postHandler(request, response);
      case "PUT":
        return putHandler(request, response);
      case "DELETE":
        return deleteHandler(request, response);
      default:
        response.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.log("Error");
  }
}

async function getHandler(request, response) {
  const convidadosList = await guestDb.getGuests();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
  try {
    if (request.body.name === undefined || request.body.name === "") {
      return response.status(400).json({ message: "Name is required" });
    }

    if (request.body.name.length > 50) {
      return response.status(400).json({ message: "Name is too long" });
    }

    const invitations = await invitationFactory().getInvitation(
      request.body.invitation_id,
    );

    if (invitations.code === "22P02") {
      return response.status(400).json({ message: "Invalid ID" });
    }

    if (invitations.length === 0 || !invitations) {
      return response.status(400).json({ message: "Invalid invitation_id" });
    }

    const returnIdGuestDb = await guestDb.createGuests(request.body);

    return response.status(201).json(returnIdGuestDb[0]);
  } catch (error) {
    return response.status(400).json(error);
  }
}

async function deleteHandler(request, response) {
  const { id } = request.query;

  if (!id || id === "" || id === undefined) {
    return response.status(404).json({ message: "guest_id is required" });
  }
}

async function putHandler(request, response) {
  const { id } = request.query;

  if (!id || id === "") {
    return response.status(400).json({ message: "guest_id is required" });
  }
}
