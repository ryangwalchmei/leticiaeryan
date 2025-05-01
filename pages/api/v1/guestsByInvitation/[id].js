import guestInvitationFactory from "../../../../models/guestsInvitation";
import invitationFactory from "../../../../models/invitation";

const guestInvitation = guestInvitationFactory();
const invitation = invitationFactory();

export default async function Gift(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    return await getHandler(request, response);
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function getHandler(request, response) {
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ message: "invitation_id is required" });
  }

  const invitations = await invitation.getInvitation(id);

  if (
    !invitations ||
    invitations.length === 0 ||
    invitations.code === "22P02"
  ) {
    return response.status(400).json({ message: "Invalid invitation_id" });
  }

  const guestsInvitation =
    (await guestInvitation.getGuestsByInvitationId(id)) || [];

  return response.status(200).json(guestsInvitation);
}
