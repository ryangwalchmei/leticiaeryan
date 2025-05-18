import database from "infra/database.js";
import { BadRequestError, NotFoundError } from "infra/errors/errors";
import isValidUUID from "utils/uuidValidator";

async function getGifts() {
  const { rows } = await database.query("SELECT  * FROM gifts;");
  return rows;
}

async function getGift(id) {
  try {
    if (!isValidUUID(id)) {
      throw new BadRequestError("Invalid ID ");
    }

    const returnGift = await database.query({
      text: "SELECT * FROM gifts WHERE id = $1;",
      values: [id],
    });

    if (returnGift.rows.length === 0) {
      throw new NotFoundError("Gift is not found");
    }

    return returnGift.rows;
  } catch (error) {
    if (error.code === "22P02") {
      throw new BadRequestError("Invalid ID");
    }
    throw error;
  }
}

async function createGifts(data) {
  const { ext, alt, link, title, price, available, received } = data;
  const propsRequired = ["ext", "link", "title"];

  const missingProps = propsRequired.filter((prop) => {
    return (
      !Object.prototype.hasOwnProperty.call(data, prop) ||
      data[prop] === undefined ||
      data[prop] === null ||
      data[prop] === ""
    );
  });

  if (missingProps.length > 0) {
    throw new BadRequestError(
      `The following properties are required and are either missing or invalid: ${missingProps.join(", ")}`,
    );
  }

  try {
    new URL(link);
  } catch {
    throw new BadRequestError("The link provided is not a valid URL.");
  }

  const { rows } = await database.query({
    text: "INSERT INTO public.gifts (ext, alt, link, title, price, available, received) VALUES($1, $2, $3, $4, $5, $6, $7)  RETURNING *;",
    values: [ext, alt, link, title, price, available, received],
  });

  return rows;
}

async function deleteGift(id) {
  if (!isValidUUID(id)) {
    throw new BadRequestError("Invalid ID");
  }

  await getGift(id);

  const { rows } = await database.query({
    text: "DELETE FROM gifts WHERE id = $1 RETURNING *;",
    values: [id],
  });

  return rows;
}

async function updateGift(id, data) {
  const { ext, alt, link, title, price, available, received } = data;
  const propsRequired = ["title"];

  const missingProps = propsRequired.filter((prop) => {
    return (
      !Object.prototype.hasOwnProperty.call(data, prop) ||
      data[prop] === undefined ||
      data[prop] === null ||
      data[prop] === ""
    );
  });

  if (missingProps.length > 0) {
    throw new BadRequestError(
      `The following properties are required and are either missing or invalid: ${missingProps.join(", ")}`,
    );
  }

  if (!isValidUUID(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const { rows } = await database.query({
    text: "UPDATE public.gifts SET ext = $1, alt = $2, link = $3, title = $4, price = $5, available = $6, received = $7 WHERE id = $8 RETURNING *;",
    values: [ext, alt, link, title, price, available, received, id],
  });

  if (rows.length === 0) {
    throw new NotFoundError("Gift is not found or is not exist");
  }

  return rows;
}

const gifts = {
  createGifts,
  getGifts,
  getGift,
  deleteGift,
  updateGift,
};

export default gifts;
