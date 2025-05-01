import database from "../infra/database.js";
export default function Guest() {
  async function getGuests() {
    try {
      const returnQuery = await database.query("SELECT  * FROM guests;");
      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }
  async function getGuest(id) {
    try {
      const returnQuery = await database.query({
        text: "SELECT * FROM guests WHERE id = $1",
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
  async function createGuests(data) {
    const {
      name,
      email,
      cell,
      is_family,
      is_friend,
      is_musician,
      is_witness,
      is_bridesmaid,
      is_bestman,
      is_bride,
      is_groom,
      guest_of,
      invitation_id,
      confirmation_status,
    } = data;

    const confirmation_date = confirmation_status
      ? new Date().toISOString()
      : null;

    const values = [
      name,
      email,
      cell,
      is_family,
      is_friend,
      is_musician,
      is_witness,
      is_bridesmaid,
      is_bestman,
      is_bride,
      is_groom,
      guest_of,
      invitation_id,
      confirmation_status,
      confirmation_date,
    ];

    try {
      const returnQuery = await database.query({
        text: `
          INSERT INTO public.guests 
          (name, email, cell, is_family, is_friend, is_musician, is_witness, is_bridesmaid, 
           is_bestman, is_bride, is_groom, guest_of, invitation_id, confirmation_status, confirmation_date) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
          RETURNING *;`,
        values,
      });

      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }

  async function deleteGuests(id) {
    try {
      const returnQuery = await database.query({
        text: "DELETE FROM guests WHERE id = $1;",
        values: [id],
      });

      if (returnQuery.rowCount === 0) {
        return new Error("Convidado não encontrado.");
      }
      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }

  async function updateGuests(id, data) {
    const {
      name,
      email,
      cell,
      is_family,
      is_friend,
      is_musician,
      is_witness,
      is_bridesmaid,
      is_bestman,
      is_bride,
      is_groom,
      guest_of,
      confirmation_status,
    } = data;

    const confirmation_date = confirmation_status
      ? new Date().toISOString()
      : null;

    try {
      const returnQuery = await database.query({
        text: `UPDATE public.guests 
                SET 
                  name = COALESCE($1, name),
                  email = COALESCE($2, email),
                  cell = COALESCE($3, cell),
                  is_family = COALESCE($4, is_family),
                  is_friend = COALESCE($5, is_friend),
                  is_musician = COALESCE($6, is_musician),
                  is_witness = COALESCE($7, is_witness),
                  is_bridesmaid = COALESCE($8, is_bridesmaid),
                  is_bestman = COALESCE($9, is_bestman),
                  is_bride = COALESCE($10, is_bride),
                  is_groom = COALESCE($11, is_groom),
                  guest_of = COALESCE($12, guest_of),
                  confirmation_status = COALESCE($13, confirmation_status),
                  confirmation_date = COALESCE($14, confirmation_date) 
                WHERE id = $15 
                RETURNING *;
                `,
        values: [
          name,
          email,
          cell,
          is_family,
          is_friend,
          is_musician,
          is_witness,
          is_bridesmaid,
          is_bestman,
          is_bride,
          is_groom,
          guest_of,
          confirmation_status,
          confirmation_date,
          id,
        ],
      });

      if (returnQuery.rowCount === 0) {
        return new Error("Convidado não encontrado.");
      }

      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }

  return {
    createGuests,
    getGuests,
    getGuest,
    deleteGuests,
    updateGuests,
  };
}
