import { MethodNotAllowedError } from "infra/errors/errors";

import { createRouter } from "next-connect";
import controller from "infra/controller";
import invitation from "models/invitation";

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

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const buffer = await invitation.exportInvitationsToXLSX();

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
