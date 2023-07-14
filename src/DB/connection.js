const mysql = require("mysql2");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

const conMysql = () => {
  connection = mysql.createConnection(dbconfig);

  connection.connect((e) => {
    if (!!e) {
      console.log("[db, error]", e);
      setTimeout(conMysql, 200);
    } else {
      console.log(["db, connected"]);
    }
  });

  connection.on("error", (e) => {
    console.log("[DB, error]", e);
    if (e.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    } else {
      console.log(e);
      // throw err;
    }
  });
};

conMysql();

module.exports = connection;
