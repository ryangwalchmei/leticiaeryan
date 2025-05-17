const crypto = require("crypto");

import database from "infra/database.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "infra/errors/errors";
export default function Invitation() {
  async function getInvitations() {
    const returnQuery = database.query("SELECT  * FROM invitation;");
    return (await returnQuery).rows;
  }
  async function getInvitation(id) {
    try {
      const returnQuery = await database.query({
        text: "SELECT * FROM invitation WHERE id = $1",
        values: [id],
      });

      if (!returnQuery.rows || returnQuery.rows.length === 0) {
        throw new NotFoundError("Invitation not found");
      }

      return returnQuery.rows;
    } catch (error) {
      if (error.code === "22P02") {
        throw new BadRequestError("Invalid ID");
      }
      throw error;
    }
  }

  async function createInvitation(data) {
    const { name, status = "pendente" } = data;

    if (name === undefined) {
      throw new BadRequestError("Name is required");
    }

    if (name.length > 50) {
      throw new BadRequestError("Name is too long");
    }
    const pin_code = crypto.randomBytes(3).readUIntBE(0, 3) % 100000;
    const shipping_date = new Date().toISOString();

    const returnQuery = await database.query({
      text: "INSERT INTO public.invitation (name, pin_code, shipping_date, status) VALUES($1, $2, $3, $4)  RETURNING *;",
      values: [name, pin_code, shipping_date, status],
    });

    return returnQuery.rows;
  }

  async function deleteInvitation(id) {
    await getInvitation(id);
    const returnQuery = await database.query({
      text: "DELETE FROM invitation WHERE id = $1 RETURNING *;",
      values: [id],
    });
    return returnQuery.rows;
  }

  async function updateInvitation(id, data) {
    const { name, shipping_date, status } = data;

    if (data.id) {
      throw new BadRequestError("ID cannot be changed");
    }
    if (name === "") {
      throw new BadRequestError("Name is required");
    }

    if (data.pin_code) {
      throw new ForbiddenError("Pin code cannot be updated");
    }

    await getInvitation(id);
    const returnQuery = await database.query({
      text: `UPDATE public.invitation 
                SET 
                  name = COALESCE($1, name), 
                  shipping_date = COALESCE($2, shipping_date),  
                  status = COALESCE($3, status)  
                WHERE id = $4 
                RETURNING *;`,
      values: [name, shipping_date, status, id],
    });

    return returnQuery.rows;
  }

  return {
    createInvitation,
    getInvitation,
    getInvitations,
    updateInvitation,
    deleteInvitation,
  };
}
