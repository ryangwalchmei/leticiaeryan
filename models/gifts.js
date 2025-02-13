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
    const {
      name,
      categoria,
      preco_estimado,
      loja_sugerida,
      status,
      data_reserva,
    } = data;

    try {
      const returnQuery = database.query({
        text: "INSERT INTO public.gifts (name, categoria, preco_estimado, loja_sugerida, status, data_reserva) VALUES($1, $2, $3, $4, $5, $6)  RETURNING *;",
        values: [
          name,
          categoria,
          preco_estimado,
          loja_sugerida,
          status,
          data_reserva,
        ],
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
    const {
      name,
      categoria,
      preco_estimado,
      loja_sugerida,
      status,
      data_reserva,
    } = data;

    try {
      const returnQuery = database.query({
        text: "UPDATE public.gifts SET name = $1, categoria = $2, preco_estimado = $3, loja_sugerida = $4, status = $5, data_reserva = $6 WHERE id = $7 RETURNING *;",
        values: [
          name,
          categoria,
          preco_estimado,
          loja_sugerida,
          status,
          data_reserva,
          id,
        ],
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
