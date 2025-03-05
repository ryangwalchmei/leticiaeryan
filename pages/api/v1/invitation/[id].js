import invitationFactory from "models/invitation";
const invitation = invitationFactory();

export default function Invitation(request, response) {
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
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function getHandler(request, response) {
  try {
    const returnInvitation = await invitation.getInvitation(request.query.id);

    if (returnInvitation.code === "22P02") {
      return response.status(404).json({ message: "Invalid ID" });
    }

    if (!returnInvitation || returnInvitation.length === 0) {
      return response.status(404).json({ message: "Invitation not found" });
    }

    return response.status(200).json(returnInvitation[0]);
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function putHandler(request, response) {
  try {
    const returnInvitation = await invitation.getInvitation(request.query.id);

    if (returnInvitation.code === "22P02") {
      return response.status(404).json({ message: "Invalid ID" });
    }

    if (returnInvitation.length === 0) {
      return response.status(404).json({ message: "Invitation not found" });
    }

    if (request.body.id) {
      return response.status(400).json({ message: "ID cannot be changed" });
    }

    if (request.body.name === "") {
      return response.status(400).json({ message: "Name is required" });
    }

    if (request.body.pin_code) {
      return response
        .status(400)
        .json({ message: "Pin code cannot be updated" });
    }

    if (returnInvitation.length === 1) {
      const updatedInvitation = await invitation.updateInvitation(
        request.query.id,
        request.body,
      );

      return response.status(200).json(updatedInvitation[0]);
    }
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHandler(request, response) {
  try {
    const returnInvitation = await invitation.getInvitation(request.query.id);

    if (returnInvitation.code === "22P02") {
      return response.status(404).json({ message: "Invalid ID" });
    }

    if (returnInvitation.length === 0) {
      return response.status(404).json({ message: "Invitation not found" });
    }

    await invitation.deleteInvitation(request.query.id).then(() => {
      return response.status(204).json(returnInvitation[0]);
    });
  } catch (error) {
    console.error("Error:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
