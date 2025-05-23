import database from "infra/database.js";

async function getDatabaseStatus() {
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

  return {
    databaseVersionValue,
    databaseMaxConnectionsValue,
    databaseOpenedConnectionsValue,
  };
}

async function getStatusServices() {
  const updated_at = new Date().toISOString();
  const databaseStatus = await getDatabaseStatus();

  const summaryStatus = {
    updated_at,
    dependencies: {
      database: {
        version: databaseStatus.databaseVersionValue,
        max_connections: Number(databaseStatus.databaseMaxConnectionsValue),
        opened_connections: databaseStatus.databaseOpenedConnectionsValue,
      },
    },
  };

  return summaryStatus;
}

const statusServices = {
  getStatusServices,
};

export default statusServices;
