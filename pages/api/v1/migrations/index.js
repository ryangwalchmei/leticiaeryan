import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    response.setHeader("Allow", allowedMethods);
    return response.status(405).json({
      error: `Method ${request.method} not allowed`,
    });
  }

  let dbClient;

  try {
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
      default:
        return response.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (dbClient) await dbClient.end();
  }
}
