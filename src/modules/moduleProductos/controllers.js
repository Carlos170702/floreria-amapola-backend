const {
  getUsuarioByIdDB,
  getFlowersDB,
  getColorsDB,
  getCiudadesDB,
  getEstadosDB,
  getPaisesDB,
  updateUSerDB,
  updateDirectionDB,
  getProvidersDB,
  InsertToProvidersDB,
  InsertToDirectionDB,
  getTypesDB,
  InsertToProductsDB,
  getProductsDB,
  DeleteProviderDB,
  updateDataProviderDB,
} = require("../../DB/mysql");

const getUsuarioByUser = (user) => {
  return getUsuarioByIdDB("tUsuarios", user);
};

const getFlowers = () => {
  return getFlowersDB("mInventario");
};

const getColors = () => {
  return getColorsDB("cColor");
};

const getTypes = () => {
  return getTypesDB("cTipo");
};

const getCiudades = () => {
  return getCiudadesDB("cCiudad");
};

const getEstados = () => {
  return getEstadosDB("cEstado");
};

const getPaises = () => {
  return getPaisesDB("cPais");
};

const updateUser = (dataUser) => {
  return updateUSerDB("tUsuarios", dataUser);
};

const updateDirection = (dataDirection) => {
  return updateDirectionDB("tDireccion", dataDirection);
};

const getProviders = () => {
  return getProvidersDB("tProveedor");
};

const InsertToProviders = (dataProvider) => {
  return InsertToProvidersDB("tProveedor", dataProvider);
};

const InsertToDirection = (dataDirection) => {
  return InsertToDirectionDB("tDireccion", dataDirection);
};

const InsertToProducts = (dataProduct) => {
  return InsertToProductsDB("tProducto", dataProduct);
};

const getProducts = () => {
  return getProductsDB("tProducto");
};

const DeleteProvider = (id) => {
  return DeleteProviderDB("tProveedor", id);
};

const updateDataProvider = (newDataProvider) => {
  return updateDataProviderDB("tProveedor", newDataProvider);
};

module.exports = {
  getUsuarioByUser,
  getFlowers,
  getColors,
  getTypes,
  getCiudades,
  getEstados,
  getPaises,
  updateUser,
  updateDirection,
  getProviders,
  InsertToProviders,
  InsertToDirection,
  InsertToProducts,
  getProducts,
  DeleteProvider,
  updateDataProvider,
};
