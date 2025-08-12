import { createRouter } from "next-connect";
import controller from "infra/controller";
import * as cookie from "cookie";
import { MethodNotAllowedError } from "infra/errors/errors";
import session from "models/session";
import authentication from "models/authentication";

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
  const userInput = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInput.email,
    userInput.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  console.log({ newSession });
  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
  return response.status(201).json(newSession);
}
