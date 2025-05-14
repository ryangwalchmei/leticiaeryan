import invitationFactory from "models/invitation";
import * as XLSX from "xlsx";

const invitationDb = invitationFactory();

export default function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermited = allowedMethods.includes(request.method);

  if (!isPermited) throw new Error({ message: "Method Not Allowed" });

  try {
    switch (request.method) {
      case "GET":
        return getHandler(request, response);
      default:
        response.setHeader("Allow", ["GET"]);
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.log("Error", error);
  }
}

async function getHandler(request, response) {
  const invitationsList = await invitationDb.getInvitations();

  try {
    const ws = XLSX.utils.json_to_sheet(invitationsList);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Convites");

    const file = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=Convites.xlsx",
    );
    return response.status(200).send(file);
  } catch (error) {
    console.log("Error", error);
    return response.status(500).json({ message: "Erro ao exportar os dados" });
  }
}
