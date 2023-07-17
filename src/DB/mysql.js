const connection = require("./connection");
const jwt = require("jsonwebtoken");

const loginDB = async (table, dataUser) => {
  const { User, Password } = dataUser;
  return new Promise((resolve, reject) => {
    connection.query(
      `select  tUsuarios.CvUsuarios,
        tUsuarios.Telefono,
        tUsuarios.ApePaterno,
        tUsuarios.ApeMaterno,
        tUsuarios.Nombre,
        tUsuarios.Usuario,
        tUsuarios.Correo,
        tUsuarios.contrasena,
        cRol.DsRol,
        tDireccion .CvDireccion,
        tDireccion.NumCas,
        tDireccion.Calle,
        tDireccion.CvCiudad,
        tDireccion.CvEstado,
        tDireccion.CvPais
       from ${table} 
       inner join tDireccion on tUsuarios.CvDireccion like tDireccion.CvDireccion
       inner join cRol on tUsuarios.CvRol like cRol.CvRol 
       where Usuario like '${User}';`,
      (err, result) => {
        // validar si existe el usuario y si la contrasena es valida
        if (result.length === 0 || result[0].contrasena !== Password) {
          return reject("Usuario no valido o contraseña no valida");
        }

        // Generartoken
        const token = jwt.sign(result[0].CvUsuarios, process.env.TOKEN_SECRET);
        result[0].token = token;

        return !!err ? reject(err) : resolve(result[0]);
      }
    );
  });
};

const getFlowersDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT m.CvInventario, m.PreVenta, m.Existencia, p.imageURL, p.Caracteristicas, p.Nombre, c.DsColor as Color, t.DsTipo as Tipo
      FROM ${table} m
      INNER JOIN tProducto p ON m.CvProducto = p.CvProducto
      INNER JOIN cColor c ON p.CvColor = c.CvColor
      INNER JOIN cTipo t ON p.CvTipo = t.CvTipo;`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const getColorsDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const getTypesDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const getCiudadesDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const getEstadosDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const getPaisesDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const updateUSerDB = async (table, dataUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `update ${table} 
       set 
        Nombre = '${dataUser?.Nombre}', 
        ApePaterno ='${dataUser?.ApePaterno}', 
        ApeMaterno='${dataUser?.ApeMaterno}', 
        Telefono='${dataUser?.Telefono}', 
        Usuario='${dataUser?.Usuario}', 
        Correo='${dataUser?.Correo}' 
       where CvUsuarios = ${dataUser?.CvUsuarios};`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const updateDirectionDB = async (table, dataDirection) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `update ${table} 
       set 
        NumCas = '${dataDirection?.NumCas}', 
        Calle= '${dataDirection?.Calle}', 
        CvCiudad = ${dataDirection?.CvCiudad}, 
        CvEstado = ${dataDirection?.CvEstado},  
        CvPais = ${dataDirection?.CvPais}  
       where CvDireccion = ${dataDirection?.CvDireccion};`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const getProvidersDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT
        P.CvProveedor,
        P.Telefono,
        P.ApePaterno,
        P.ApeMaterno,
        P.Nombre,
        P.RFC,
        P.Correo,
        D.CvDireccion,
        D.NumCas,
        D.Calle,
        C.DsCiudad,
        C.CvCiudad,
        E.DsEstado,
        E.CvEstado,
        Pa.DsPais,
        Pa.CvPais
      FROM 
        ${table} P
      INNER JOIN tDireccion D ON P.CvDireccion = D.CvDireccion
      INNER JOIN cCiudad C ON D.CvCiudad = C.CvCiudad
      INNER JOIN cEstado E ON D.CvEstado = E.CvEstado
      INNER JOIN cPais Pa ON D.CvPais = Pa.CvPais 
      Order By CvProveedor;`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const InsertToProvidersDB = async (table, dataProveedor) => {
  const { Telefono, ApePaterno, ApeMaterno, Nombre, RFC, Correo, CvDireccion } =
    dataProveedor;

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO 
        ${table} (Telefono, ApePaterno, ApeMaterno, Nombre, RFC, Correo, CvDireccion) 
       VALUES ('${Telefono}', '${ApePaterno}', '${ApeMaterno}', '${Nombre}', '${RFC}', '${Correo}', ${CvDireccion});`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const InsertToDirectionDB = async (table, dataDirection) => {
  const { NumCas, Calle, CvCiudad, CvEstado, CvPais } = dataDirection;

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO 
        ${table} (NumCas, Calle, CvCiudad, CvEstado, CvPais) 
      VALUES ('${NumCas}', '${Calle}', ${CvCiudad}, ${CvEstado}, ${CvPais});`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const InsertToProductsDB = async (table, dataProduct) => {
  console.log(dataProduct);
  const { imageURL, Caracteristicas, Nombre, CvColor, CvTipo } = dataProduct;

  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} (imageURL, Caracteristicas, Nombre, CvColor, CvTipo)
      VALUE ('${imageURL}', '${Caracteristicas}', '${Nombre}', ${CvColor}, ${CvTipo});`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const getProductsDB = async (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from ${table};`, (err, result) => {
      return !!err ? reject(err) : resolve(result);
    });
  });
};

const DeleteProviderDB = async (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `delete from ${table} where CvProveedor = ${id};`,
      (err, result) => {
        if (result?.affectedRows === 0) {
          const error = new Error("Proveedor no encontrado");
          reject(error);
        }
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

const updateDataProviderDB = async (table, newDataProvider) => {
  const { Telefono, ApePaterno, ApeMaterno, Nombre, RFC, Correo, CvProveedor } =
    newDataProvider;
  return new Promise((resolve, reject) => {
    connection.query(
      `update ${table} 
      set 
        Telefono = '${Telefono}', 
        ApePaterno = '${ApePaterno}', 
        ApeMaterno = '${ApeMaterno}', 
        Nombre = '${Nombre}',   
        RFC = '${RFC}',  
        Correo = '${Correo}'  
      where CvProveedor = ${CvProveedor};`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result);
      }
    );
  });
};

// Para verificar el usaurio y su rol
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select  tUsuarios.CvUsuarios,
      tUsuarios.Telefono,
      tUsuarios.ApePaterno,
      tUsuarios.ApeMaterno,
      tUsuarios.Nombre,
      tUsuarios.Usuario,
      tUsuarios.Correo,
      tUsuarios.contrasena,
      cRol.DsRol,
      tDireccion .CvDireccion,
      tDireccion.NumCas,
      tDireccion.Calle,
      tDireccion.CvCiudad,
      tDireccion.CvEstado,
      tDireccion.CvPais
     from tUsuarios 
     inner join tDireccion on tUsuarios.CvDireccion like tDireccion.CvDireccion
     inner join cRol on tUsuarios.CvRol like cRol.CvRol 
     where CvUsuarios like '${id}';`,
      (err, result) => {
        return !!err ? reject(err) : resolve(result[0]);
      }
    );
  });
};

const addUserDB = (dataUser) => {
  const {
    Telefono,
    ApePaterno,
    ApeMaterno,
    Nombre,
    Usuario,
    Correo,
    Contrasena,
    NumCas,
    Calle,
    CvCiudad,
    CvEstado,
    CvPais,
    CvRol,
  } = dataUser;

  return new Promise((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      // add direction
      connection.query(
        `INSERT INTO tDireccion (NumCas, Calle, CvCiudad, CvEstado, CvPais) 
        VALUES ('${NumCas}', '${Calle}', ${CvCiudad}, ${CvEstado}, ${CvPais});`,
        (err, result) => {
          if (err) {
            connection.rollback(() => {
              reject("Ocurrio un error");
            });
          }
          // add user
          connection.query(
            `INSERT INTO 
              tUsuarios (Telefono, ApePaterno, ApeMaterno, Nombre, Usuario, Correo, Contrasena, CvRol, CvDireccion) 
            VALUES ('${Telefono}', '${ApePaterno}', '${ApeMaterno}', '${Nombre}', '${Usuario}', '${Correo}', '${Contrasena}', ${CvRol}, ${result.insertId});`,
            (err, result) => {
              if (err) {
                connection.rollback(() => {
                  reject("Ocurrio un error");
                });
              }

              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    reject("Ocurrio un error");
                  });
                }

                // Generartoken
                const token = jwt.sign(
                  result.insertId,
                  process.env.TOKEN_SECRET
                );
                resolve(token);
              });
            }
          );
        }
      );
    });
  });
};

module.exports = {
  loginDB,
  getFlowersDB,
  getColorsDB,
  getTypesDB,
  getCiudadesDB,
  getEstadosDB,
  getPaisesDB,
  updateUSerDB,
  updateDirectionDB,
  getProvidersDB,
  InsertToProvidersDB,
  InsertToDirectionDB,
  InsertToProductsDB,
  getProductsDB,
  DeleteProviderDB,
  updateDataProviderDB,
  getUserById,
  addUserDB,
};
