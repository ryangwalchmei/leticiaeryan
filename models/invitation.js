const crypto = require("crypto");
import * as XLSX from "xlsx";

import database from "infra/database.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "infra/errors/errors";
import isValidUUID from "utils/uuidValidator";

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
      throw new NotFoundError({ message: "Invitation not found" });
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
    throw new ForbiddenError({
      message: "Pin code cannot be updated",
    });
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

async function getInvitationGuests(id) {
  if (!id) {
    throw new BadRequestError("invitation_id is required");
  }

  if (!isValidUUID(id)) {
    throw new BadRequestError("Invalid invitation_id");
  }

  await getInvitation(id);

  const { rows } = await database.query({
    text: "SELECT * FROM guests WHERE invitation_id = $1",
    values: [id],
  });

  return rows;
}

async function exportInvitationsToXLSX() {
  const invitationsList = await getInvitations();
  if (!Array.isArray(invitationsList)) {
    throw new NotFoundError({
      message: "Data format error: expected an array of invitations",
    });
  }
  const worksheet = XLSX.utils.json_to_sheet(invitationsList, {
    header: ["id", "name", "pin_code", "shipping_date", "status"],
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Convites");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  return buffer;
}

const invitation = {
  createInvitation,
  getInvitation,
  getInvitations,
  updateInvitation,
  deleteInvitation,
  getInvitationGuests,
  exportInvitationsToXLSX,
};

export default invitation;
