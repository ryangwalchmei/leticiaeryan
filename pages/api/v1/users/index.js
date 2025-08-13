import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";
import { MethodNotAllowedError } from "infra/errors/errors";
import session from "models/session";

const router = createRouter();

router.post(postHandler);
router.get(getHandler);

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

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  const sessionObject = await session.findOneValidByToken(sessionToken);
  const renewedSessionObject = await session.renew(sessionObject.id);
  controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(sessionObject.user_id);

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );
  return response.status(200).json(userFound);
}
