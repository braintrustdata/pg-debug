import pkg from "pg";
const { Pool, types } = pkg;

async function main() {
  const url = process.env.PG_URL;
  const is_docker = true;
  const PG_POOL_CONFIG_MAX_NUM_CLIENTS = undefined;

  const conn = new Pool({
    connectionString: url,
    // According to the docs, any ssl-related connection params specified in the
    // `connectionString` will override these settings:
    // https://node-postgres.com/features/ssl#usage-with-connectionstring. So
    // they serve as a default.
    ssl:
      // Locally, or if connecting to clickhouse, default to no SSL (we have not
      // configured Clickhouse to use SSL).
      //
      // Otherwise, we configure the SSL connection as suggested in these docs:
      // https://node-postgres.com/announcements#pg80-release.
      is_docker
        ? false
        : {
            rejectUnauthorized: false,
          },
    max: PG_POOL_CONFIG_MAX_NUM_CLIENTS,
  });

  const c = await conn.connect();
  console.log(await c.query("SELECT NOW()"));
  process.exit(0);
}

main().catch(console.error);
