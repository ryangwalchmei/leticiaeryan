import database from "infra/database.js";
export default function Convidados() {
  async function getConvidados() {
    try {
      const returnQuery = database.query("SELECT  * FROM convidados;");
      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }
  async function getConvidado(id) {
    try {
      const returnQuery = database.query({
        text: "SELECT * FROM convidados WHERE id = $1",
        values: [id]
      });
      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }
  async function createConvidados(data) {
    const { name, quantindividuals, quantchildrens, isfamily, isfriend, ismusician, ispadrin, pertencea, statusconvite, cell } = data;

    try {

      const returnQuery = database.query({
        text: "INSERT INTO public.convidados (name, quantindividuals, quantchildrens, isfamily, isfriend, ismusician, ispadrin, pertencea, statusconvite, cell) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING *;",
        values: [name, quantindividuals, quantchildrens, isfamily, isfriend, ismusician, ispadrin, pertencea, statusconvite, cell]
      });

      return (await returnQuery).rows;
    } catch (error) {
      throw error;
    }
  }

  return {
    createConvidados,
    getConvidados,
    getConvidado
  };
}