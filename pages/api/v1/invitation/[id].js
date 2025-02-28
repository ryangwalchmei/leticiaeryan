import invitationFactory from "models/invitation";
const invitation = invitationFactory();

export default function Invitation(request, response) {
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
  const returnInvitation = await invitation.getInvitation(request.query.id);

  if (returnInvitation.code === "22P02") {
    return response.status(404).json({ error: "Invalid ID" });
  }

  if (returnInvitation.length === 0) {
    return response.status(404).json({});
  }

  if (returnInvitation.length === 1) {
    return response.status(200).json(returnInvitation[0]);
  }
}

async function putHandler(request, response) {
  if (request.body.pin_code) {
    return response.status(400).json({ error: "Pin code cannot be updated" });
  }

  const returnInvitation = await invitation.updateInvitation(
    request.query.id,
    request.body,
  );

  return response.status(200).json(returnInvitation[0]);
}

async function deleteHandler(request, response) {
  const returnInvitation = await invitation.deleteInvitation(request.query.id);
  return response.status(204).json(returnInvitation[0]);
}
