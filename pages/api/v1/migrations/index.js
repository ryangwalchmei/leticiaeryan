import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { MethodNotAllowedError } from "infra/errors/errors";
import { handleError } from "infra/errors/erroHandler";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  const isPermited = allowedMethods.includes(request.method);

  let dbClient;

  try {
    if (!isPermited) {
      throw new MethodNotAllowedError({
        cause: new Error("Método não permitido"),
        method: request.method,
        allowedMethods,
      });
    }

    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    async function getHandler() {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      return response.status(200).json(pendingMigrations);
    }

    async function postHandler() {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      const statusCode = migratedMigrations.length > 0 ? 201 : 200;
      return response.status(statusCode).json(migratedMigrations);
    }

    switch (request.method) {
      case "GET":
        return await getHandler();
      case "POST":
        return await postHandler();
    }
  } catch (error) {
    return handleError(error, request, response);
  } finally {
    if (dbClient) await dbClient.end();
  }
}
