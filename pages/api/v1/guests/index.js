import guestFactory from "models/guests";
import invitationFactory from "models/invitation";

const guestDb = guestFactory();

export default function guest(request, response) {
  const allowedMethods = ["GET", "POST"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error();

  try {
    if (request.method === "GET") {
      return getHandler(request, response);
    }

    return postHandler(request, response);
  } catch (error) {
    console.log("Error");
  }
}

async function getHandler(request, response) {
  const convidadosList = await guestDb.getGuests();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
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

  console.log({ returnIdGuestDb });

  return response.status(201).json(returnIdGuestDb[0]);
}
