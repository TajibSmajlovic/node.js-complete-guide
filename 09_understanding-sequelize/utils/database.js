const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "nodejs-complete-guide-course",
    "root",
    "amdquad64bitcore",
    { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;
