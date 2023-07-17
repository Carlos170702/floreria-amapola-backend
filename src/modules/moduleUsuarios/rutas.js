const express = require("express");
const JWT = require("jsonwebtoken");
const {
  getFlowers,
  getColors,
  getCiudades,
  getEstados,
  getPaises,
  updateUser,
  updateDirection,
  getProviders,
  InsertToProviders,
  InsertToDirection,
  getTypes,
  InsertToProducts,
  getProducts,
  DeleteProvider,
  updateDataProvider,
  login,
  addUser,
} = require("../moduleProductos/controllers");
const { validateJWT } = require("../../middleware/validateJWT");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const dataLogin = await login(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataLogin,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/validarToken", validateJWT);

router.get("/getFlowers", async (req, res) => {
  try {
    const dataFlowers = await getFlowers();
    res.json({
      error: false,
      status: 200,
      message: dataFlowers,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getColors", async (req, res) => {
  try {
    const dataColors = await getColors();
    res.json({
      error: false,
      status: 200,
      message: dataColors,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getTypes", async (req, res) => {
  try {
    const dataTypes = await getTypes();
    res.json({
      error: false,
      status: 200,
      message: dataTypes,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getCiudades", async (req, res) => {
  try {
    const dataCiudades = await getCiudades();
    res.json({
      error: false,
      status: 200,
      message: dataCiudades,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getEstados", async (req, res) => {
  try {
    const dataEstados = await getEstados();
    res.json({
      error: false,
      status: 200,
      message: dataEstados,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getPaises", async (req, res) => {
  try {
    const dataPaises = await getPaises();
    res.json({
      error: false,
      status: 200,
      message: dataPaises,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const dataUpdateUser = await updateUser(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataUpdateUser,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/updateDirection", async (req, res) => {
  try {
    const dataUpdateDirection = await updateDirection(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataUpdateDirection,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.get("/getProviders", async (req, res) => {
  try {
    const dataGetProviders = await getProviders();
    res.json({
      error: false,
      status: 200,
      message: dataGetProviders,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/addProvider", async (req, res) => {
  try {
    const dataAddProvider = await InsertToProviders(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataAddProvider,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/addDirection", async (req, res) => {
  try {
    const dataAddDirection = await InsertToDirection(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataAddDirection,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/addProduct", async (req, res) => {
  try {
    const dataAddProduct = await InsertToProducts(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataAddProduct,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/getProducts", async (req, res) => {
  try {
    const dataGetProducts = await getProducts(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataGetProducts,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.delete("/deleteProvider/:id", async (req, res) => {
  try {
    const dataDeleteProvider = await DeleteProvider(req.params.id);
    res.json({
      error: false,
      status: 200,
      message: dataDeleteProvider,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/updateProvider", async (req, res) => {
  try {
    const dataUpdateProvider = await updateDataProvider(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataUpdateProvider,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

router.post("/addUser", async (req, res) => {

  try {
    const dataAddUser = await addUser(req.body);
    res.json({
      error: false,
      status: 200,
      message: dataAddUser,
    });
  } catch (e) {
    res.json({
      error: true,
      status: 500,
      message: e,
    });
  }
});

module.exports = router;
