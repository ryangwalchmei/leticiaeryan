import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";
import { MethodNotAllowedError } from "infra/errors/errors";

const router = createRouter();

router.post(postHandler);
router.all((request) => {
  const allowedMethods = ["POST"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const [newUser] = await user.create(request.body);
  return response.status(201).json(newUser);
}
