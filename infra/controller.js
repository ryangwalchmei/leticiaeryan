import {
  MethodNotAllowedError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from "infra/errors/errors";

const simpleHandledErrors = [
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
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

  const internalError = new InternalServerError({ cause: error });
  console.error("Erro interno não tratado:", internalError);
  return response.status(internalError.statusCode).json(internalError.toJSON());
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
