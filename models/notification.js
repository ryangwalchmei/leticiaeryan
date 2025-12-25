import database from "infra/database.js";
import { BadRequestError, NotFoundError } from "infra/errors/errors";
import { version as uuidVersion, validate as isUuid } from "uuid";

async function getNotifications() {
  const result = await database.query("SELECT * FROM notifications;");
  return result.rows;
}

async function getNotificationById(id) {
  const result = await database.query({
    text: `
        SELECT * FROM notifications WHERE id = $1;`,
    values: [id],
  });

  if (result.rowCount === 0) {
    throw new NotFoundError({
      message: "A notificação informada não foi encontrada no sistema.",
      action: "Verifique se o notification id está digitado corretamente.",
    });
  }

  return result.rows[0];
}

async function createNotifications(data) {
  const { guest_id, title, message, type } = data;
  const is_read = false;
  const datecreated = new Date().toISOString();
  const propsRequired = ["guest_id", "title", "message", "type"];

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
      `Missing required fields: ${missingProps.join(", ")}`,
    );
  }
  const result = await database.query({
    text: `
          INSERT INTO public.notifications 
            (guest_id, title, message, type, is_read, datecreated) 
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;`,
    values: [guest_id, title, message, type, is_read, datecreated],
  });

  return result.rows[0];
}

async function markAsRead(data) {
  const { query, body } = data;
  if (body.id) {
    throw new BadRequestError("ID cannot be changed");
  }

  if (body.title || body.title === "") {
    throw new BadRequestError("Title cannot be changed");
  }

  if ((!isUuid(query.id) || uuidVersion(query.id)) !== 4) {
    throw new BadRequestError("invalid input syntax for type uuid");
  }

  await getNotificationById(query.id);

  const dateread = new Date().toISOString();
  const is_read = true;

  const result = await database.query({
    text: `
          UPDATE public.notifications 
          SET 
            is_read = COALESCE($1, is_read),  
            dateread = COALESCE($2, dateread)  
          WHERE id = $3 
          RETURNING *;`,
    values: [is_read, dateread, query.id],
  });

  return result.rows[0];
}

const notifications = {
  getNotifications,
  getNotificationById,
  createNotifications,
  markAsRead,
};

export default notifications;
