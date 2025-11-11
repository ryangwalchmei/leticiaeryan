import { createRouter } from "next-connect";
import controller from "infra/controller";
import { ForbiddenError, MethodNotAllowedError } from "infra/errors/errors";
import session from "models/session";
import authentication from "models/authentication";
import authorization from "models/authorization";

const router = createRouter();
router.use(controller.injectAnonymousOrUser);
router.post(controller.canRequest("create:session"), postHandler);
router.delete(deleteHandler);
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
  const userInput = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInput.email,
    userInput.password,
  );

  if (!authorization.can(authenticatedUser, "create:session")) {
    throw new ForbiddenError({
      message: "Você não possui permissão para fazer login.",
      action: "Contate o suporte caso você acredite que isto seja um erro.",
    });
  }

  const newSession = await session.create(authenticatedUser.id);

  controller.setSessionCookie(newSession.token, response);
  return response.status(201).json(newSession);
}

async function deleteHandler(request, response) {
  const sessionToken = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(sessionToken);
  const expiredSession = await session.expireById(sessionObject.id);
  controller.clearSessionCookie(response);

  return response.status(200).json(expiredSession);
}
