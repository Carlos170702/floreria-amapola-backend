require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MSQYL_DATABASE || "FloreriaAmapola",
  },
};
