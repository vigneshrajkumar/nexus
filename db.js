const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Stonebraker",
    host: "localhost",
    port: 6001,
    database: "nexus"
});
module.exports = pool;