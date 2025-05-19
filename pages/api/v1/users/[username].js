import controller from "infra/controller";
import { MethodNotAllowedError } from "infra/errors/errors";
import user from "models/user";
import { createRouter } from "next-connect";

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
  const [userFound] = await user.findOneByUsername(request.query.username);
  return response.status(200).json(userFound);
}
