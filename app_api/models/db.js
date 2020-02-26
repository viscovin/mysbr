const pg = require('pg');
var client;

if (process.env.NODE_ENV == 'production') {
  client = new pg.Client({
    connectionString: process.env.DATABASE_URL
  });
  console.log("connecting to DB in PRODUCTION  mode");
} else {
  client = new pg.Client({
    host: '/var/run/postgresql',
    user: process.env.DB_USER,
    database: 'sbr'
  });
  console.log("connecting to DB in DEVELOPMENT mode");
}

client.connect();

module.exports.client = client;
