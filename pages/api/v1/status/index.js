import database from "infra/database.js";
import { handleError } from "infra/errors/erroHandler";
import { MethodNotAllowedError } from "infra/errors/errors";

const status = async (request, response) => {
  const allowedMethods = ["GET"];
  const isPermited = allowedMethods.includes(request.method);

  try {
    if (!isPermited) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }
    switch (request.method) {
      case "GET":
        return await getHandler(request, response);
    }
  } catch (error) {
    return handleError(error, request, response);
  }
};

async function getHandler(request, response) {
  try {
    const updated_at = new Date().toISOString();
    const databaseName = process.env.POSTGRES_DB;

    const databaseVersionResult = await database.query(`SHOW server_version;`);
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query(
      `SHOW max_connections;`,
    );
    const databaseMaxConnectionsValue =
      databaseMaxConnectionsResult.rows[0].max_connections;

    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datName = $1;",
      values: [databaseName],
    });
    const databaseOpenedConnectionsValue =
      databaseOpenedConnectionsResult.rows[0].count;

    response.status(200).json({
      updated_at,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: Number(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    });
  } catch (error) {
    return handleError(error, request, response);
  }
}

export default status;
