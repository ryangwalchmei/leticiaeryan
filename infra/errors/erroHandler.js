import {
  MethodNotAllowedError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from "infra/errors/errors";

export function handleError(error, request, response) {
  if (error instanceof MethodNotAllowedError) {
    response.setHeader("Allow", error.allowedMethods);
    return response.status(error.statusCode).json(error.toJSON());
  }

  if (error instanceof BadRequestError) {
    return response.status(error.statusCode).json(error.toJSON());
  }

  if (error instanceof UnauthorizedError) {
    return response.status(error.statusCode).json(error.toJSON());
  }

  if (error instanceof ForbiddenError) {
    return response.status(error.statusCode).json(error.toJSON());
  }

  if (error instanceof ConflictError) {
    return response.status(error.statusCode).json(error.toJSON());
  }

  if (error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error.toJSON());
  }

  const internalError = new InternalServerError({ cause: error });
  console.error("Erro interno não tratado:", internalError);
  return response.status(internalError.statusCode).json(internalError.toJSON());
}
