import controller from "infra/controller";
import database from "infra/database.js";
import { MethodNotAllowedError } from "infra/errors/errors";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);
router.all((request) => {
  const allowedMethods = ["GET"];
  throw new MethodNotAllowedError({
    cause: new Error("Método não permitido"),
    method: request.method,
    allowedMethods,
  });
});

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}
