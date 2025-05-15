import invitationFactory from "models/invitation";

const invitationDb = invitationFactory();

export default function Invitation(request, response) {
  const allowedMethods = ["GET", "POST"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    switch (request.method) {
      case "GET":
        return getHandler(request, response);
      case "POST":
        return postHandler(request, response);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function getHandler(request, response) {
  try {
    const convidadosList = await invitationDb.getInvitations();
    return response.status(200).json(convidadosList);
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function postHandler(request, response) {
  try {
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
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
