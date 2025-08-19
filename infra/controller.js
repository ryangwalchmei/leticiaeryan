import * as cookie from "cookie";
import session from "models/session";

import {
  MethodNotAllowedError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
  ValidationError,
} from "infra/errors/errors";

const simpleHandledErrors = [
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  ValidationError,
];

function onErrorHandler(error, request, response) {
  if (error instanceof MethodNotAllowedError) {
    response.setHeader("Allow", error.allowedMethods);
    return response.status(error.statusCode).json(error.toJSON());
  }

  for (const ErrorType of simpleHandledErrors) {
    if (error instanceof ErrorType) {
      return response.status(error.statusCode).json(error.toJSON());
    }
  }

  const internalError = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });
  console.error("Erro interno não tratado:", internalError);
  return response.status(internalError.statusCode).json(internalError.toJSON());
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

async function setSessionCookie(sessionToken, response) {
  const setCookie = cookie.serialize("session_id", sessionToken, {
    path: "/",
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

async function clearSessionCookie(response) {
  const setCookie = cookie.serialize("session_id", "invalid", {
    path: "/",
    maxAge: -1,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
  setSessionCookie,
  clearSessionCookie,
};

export default controller;
