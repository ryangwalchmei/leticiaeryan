import database from "infra/database.js";
export default function gifts() {
  async function getGifts() {
    try {
      const returnQuery = database.query("SELECT  * FROM gifts;");
      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }
  async function getGift(id) {
    try {
      const returnQuery = await database.query({
        text: "SELECT * FROM gifts WHERE id = $1;",
        values: [id],
      });

      return returnQuery.rows;
    } catch (error) {
      throw error;
    }
  }
  async function createGifts(data) {
    const { ext, alt, link, title, price, available, received } = data;

    try {
      const returnQuery = database.query({
        text: "INSERT INTO public.gifts (ext, alt, link, title, price, available, received) VALUES($1, $2, $3, $4, $5, $6, $7)  RETURNING *;",
        values: [ext, alt, link, title, price, available, received],
      });

      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }

  async function deleteGift(id) {
    try {
      const returnQuery = database.query({
        text: "DELETE FROM gifts WHERE id = $1;",
        values: [id],
      });

      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }

  async function updateGift(id, data) {
    const { ext, alt, link, title, price, available, received } = data;

    try {
      const returnQuery = database.query({
        text: "UPDATE public.gifts SET ext = $1, alt = $2, link = $3, title = $4, price = $5, available = $6, received = $7 WHERE id = $8 RETURNING *;",
        values: [ext, alt, link, title, price, available, received, id],
      });

      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }

  return {
    createGifts,
    getGifts,
    getGift,
    deleteGift,
    updateGift,
  };
}
