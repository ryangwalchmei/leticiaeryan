import invitationFactory from "models/invitation";
import * as XLSX from "xlsx";

const invitationDb = invitationFactory();

export default async function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermitted = allowedMethods.includes(request.method);

  if (!isPermitted) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      default:
        return response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Erro inesperado:", error);
    return response.status(500).json({ message: "Erro interno no servidor" });
  }
}

async function getHandler(request, response) {
  try {
    const invitationsList = await invitationDb.getInvitations();

    const worksheet = XLSX.utils.json_to_sheet(invitationsList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Convites");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=Convites.xlsx",
    );
    response.setHeader("Content-Length", Buffer.byteLength(buffer));

    return response.status(200).send(buffer);
  } catch (error) {
    console.error("Erro ao gerar planilha:", error);
    return response.status(500).json({ message: "Erro ao exportar os dados" });
  }
}
