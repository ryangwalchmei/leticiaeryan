import { handleError } from "infra/errors/erroHandler";
import { BadRequestError, MethodNotAllowedError } from "infra/errors/errors";
import giftsFactory from "models/gifts";

const giftsDb = giftsFactory();

export default async function gifts(request, response) {
  const allowedMethods = ["GET", "POST"];
  const isPermited = allowedMethods.includes(request.method);

  try {
    if (!isPermited) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }

    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
      case "POST":
        return await postHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function getHandler(request, response) {
  try {
    const giftsList = await giftsDb.getGifts();
    return response.status(200).json(giftsList);
  } catch (error) {
    return handleError(error, request, response);
  }
}

async function postHandler(request, response) {
  try {
    const propsRequired = ["ext", "link", "title"];

    const missingProps = propsRequired.filter((prop) => {
      return (
        !Object.prototype.hasOwnProperty.call(request.body, prop) ||
        request.body[prop] === undefined ||
        request.body[prop] === null ||
        request.body[prop] === ""
      );
    });

    if (missingProps.length > 0) {
      throw new BadRequestError(
        `The following properties are required and are either missing or invalid: ${missingProps.join(", ")}`,
      );
    }

    try {
      new URL(request.body.link);
    } catch {
      throw new BadRequestError("The link provided is not a valid URL.");
    }

    const returnIdGiftsDb = await giftsDb.createGifts(request.body);

    return response.status(201).json(returnIdGiftsDb[0]);
  } catch (error) {
    return handleError(error, request, response);
  }
}
