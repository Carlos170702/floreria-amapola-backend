const express = require("express");
const config = require("./src/config");
const morgan = require("morgan");
const cors = require("cors");
const usuarios = require("./src/modules/moduleUsuarios/rutas");

const app = express();

// config
app.set("port", config.app.port);

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Permitir solicitudes desde cualquier origen
  })
);

// routes
app.use("/api/floreria", usuarios);

app.listen(app.get("port"), () => {
  console.log("listening on port " + app.get("port"));
});

module.exports = app;
