import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";
import { MethodNotAllowedError } from "infra/errors/errors";
import activation from "models/activation";

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

  const activationToken = await activation.create(newUser.id);
  await activation.sendEmailToUser(newUser, activationToken);

  return response.status(201).json(newUser);
}
