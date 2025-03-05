const crypto = require("crypto");

import database from "infra/database.js";
export default function Invitation() {
  async function getInvitations() {
    try {
      const returnQuery = database.query("SELECT  * FROM invitation;");
      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }
  async function getInvitation(id) {
    try {
      const returnQuery = await database.query({
        text: "SELECT * FROM invitation WHERE id = $1",
        values: [id],
      });

      return returnQuery.rows;
    } catch (error) {
      if (error.code === "22P02") {
        return error;
      }
      throw error;
    }
  }
  async function createInvitation(data) {
    const { name, status = "pendente" } = data;

    const pin_code = crypto.randomBytes(3).readUIntBE(0, 3) % 100000;
    const shipping_date = new Date().toISOString();

    try {
      const returnQuery = await database.query({
        text: "INSERT INTO public.invitation (name, pin_code, shipping_date, status) VALUES($1, $2, $3, $4)  RETURNING *;",
        values: [name, pin_code, shipping_date, status],
      });

      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }

  async function deleteInvitation(id) {
    try {
      const returnQuery = database.query({
        text: "DELETE FROM invitation WHERE id = $1;",
        values: [id],
      });

      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }

  async function updateInvitation(id, data) {
    const { name, shipping_date, status } = data;

    try {
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
    } catch (error) {
      throw error;
    }
  }

  return {
    createInvitation,
    getInvitation,
    getInvitations,
    updateInvitation,
    deleteInvitation,
  };
}
