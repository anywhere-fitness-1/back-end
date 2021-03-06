const pgConnection = process.env.DATABASE_URL || "";

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/auth.db3",
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },

    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/data/migrations",
    },
    seeds: {
      directory: __dirname + "/data/seeds",
    },
  },
};
