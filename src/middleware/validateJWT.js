const JWT = require("jsonwebtoken");
const { getUserById } = require("../DB/mysql");
const { request, response } = require("express");

const validateJWT = async (req = request, res = response) => {
  const token = req.headers;

  if (!!token["x-token"]) {
    try {
      const id = JWT.verify(token["x-token"], process.env.TOKEN_SECRET);
      const user = await getUserById(id);
      user.token = token["x-token"];
      return res.status(200).json({ error: false, status: 200, message: user });
    } catch (e) {
      return res.json({
        error: true,
        status: 500,
        message: e,
      });
    }
  } else {
    return res
      .status(404)
      .json({ error: true, status: 404, message: "Invalid token" });
  }
};

module.exports = {
  validateJWT,
};
