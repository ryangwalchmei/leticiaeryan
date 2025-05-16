import { handleError } from "infra/errors/erroHandler";
import { MethodNotAllowedError, NotFoundError } from "infra/errors/errors";
import invitationFactory from "models/invitation";
import * as XLSX from "xlsx";

const invitationDb = invitationFactory();

export default async function guest(request, response) {
  const allowedMethods = ["GET"];
  const isPermitted = allowedMethods.includes(request.method);

  try {
    if (!isPermitted) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }
    switch (request.method) {
      case "GET":
        return getHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const invitationsList = await invitationDb.getInvitations();

    if (!Array.isArray(invitationsList)) {
      throw new NotFoundError(
        "Data format error: expected an array of invitations",
      );
    }

    const worksheet = XLSX.utils.json_to_sheet(invitationsList, {
      header: ["id", "name", "pin_code", "shipping_date", "status"],
    });

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
    response.setHeader("X-Content-Type-Options", "nosniff");

    return response.status(200).send(buffer);
  } catch (error) {
    return handleError(error, request, response);
  }
}
