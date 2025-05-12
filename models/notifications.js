import database from "infra/database.js";

export default function notifications() {
  async function getNotifications() {
    try {
      const result = await database.query("SELECT * FROM notifications;");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async function getNotificationById(id) {
    try {
      const result = await database.query({
        text: `
        SELECT * FROM notifications WHERE id = $1;`,
        values: [id],
      });

      return result.rows;
    } catch (error) {
      if (error.code === "22P02") {
        return error;
      }
      throw error;
    }
  }

  async function createNotifications(data) {
    const { guest_id, title, message, type } = data;
    const is_read = false;
    const datecreated = new Date().toISOString();

    try {
      const result = await database.query({
        text: `
          INSERT INTO public.notifications 
            (guest_id, title, message, type, is_read, datecreated) 
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;`,
        values: [guest_id, title, message, type, is_read, datecreated],
      });

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async function markAsRead(id) {
    const dateread = new Date().toISOString();
    const is_read = true;

    try {
      const result = await database.query({
        text: `
          UPDATE public.notifications 
          SET 
            is_read = COALESCE($1, is_read),  
            dateread = COALESCE($2, dateread)  
          WHERE id = $3 
          RETURNING *;`,
        values: [is_read, dateread, id],
      });

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  return {
    getNotifications,
    getNotificationById,
    createNotifications,
    markAsRead,
  };
}
