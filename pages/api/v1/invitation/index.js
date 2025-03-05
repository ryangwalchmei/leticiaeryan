import invitationFactory from "models/invitation";

const invitationDb = invitationFactory();

export default function Invitation(request, response) {
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

async function deleteHandler(request, response) {
  return otherMethods(request, response);
}

async function putHandler(request, response) {
  return otherMethods(request, response);
}

async function otherMethods(request, response) {
  const { id } = request.query;

  if (!id || id === "" || id === undefined) {
    return response.status(400).json({ message: "invitation_id is required" });
  }
}
