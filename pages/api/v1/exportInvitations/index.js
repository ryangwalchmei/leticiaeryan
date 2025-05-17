import { MethodNotAllowedError, NotFoundError } from "infra/errors/errors";
import invitationFactory from "models/invitation";
import * as XLSX from "xlsx";
import { createRouter } from "next-connect";
import controller from "infra/controller";

const router = createRouter();
router.get(getHandler);
router.all((request) => {
  const allowedMethods = ["GET"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

const invitationDb = invitationFactory();

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}
