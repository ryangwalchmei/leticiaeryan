import invitationFactory from "models/invitation";

const invitationDb = invitationFactory();

export default function Invitation(request, response) {
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
  const convidadosList = await invitationDb.getInvitations();
  return response.status(200).json(convidadosList);
}

async function postHandler(request, response) {
  if (request.body.name === undefined) {
    return response.status(400).json({ error: "Name is required" });
  }

  if (request.body.name.length > 50) {
    return response.status(400).json({ error: "Name is too long" });
  }

  const returnIdInvitationDb = await invitationDb.createInvitation(
    request.body,
  );

  return response.status(201).json(returnIdInvitationDb[0]);
}
