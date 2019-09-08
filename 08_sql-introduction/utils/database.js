const mySql = require("mysql2");

const pool = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "nodejs-complete-guide-course",
    password: "amdquad64bitcore"
});

module.exports = pool.promise();
