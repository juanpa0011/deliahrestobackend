const DB = require ('../database/conexion.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// ################## PRODUCTS
const getProducts = (req, res) => {
    const sentenceSQL = 'SELECT * FROM productos';
    DB.query(sentenceSQL, (error, row) => {
        if (error) {
            console.log(error)
        } else {
            console.log(row);
            res.json({
                row
            });
        }
    });
};
const getProductId = (req, res) => {
    const id_pro = req.params;
    const sentenceSQL = 'SELECT * FROM productos WHERE id_pro = ?';
    DB.query(sentenceSQL,id_pro, (error, row) => {
        if (error) {
            console.log(error)
        } else {
            console.log(row);
            res.json({
                row
            });
        }
    });
};
const postProduct = (req, res) => {
    const {nombre, precio, detalle, url} = req.body;
    const sentenceSQL = 'INSERT INTO productos SET ?';
    const pro_id = undefined
    DB.query(sentenceSQL, [{nombre, precio, detalle, url}], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                row
            });
        }
    });
};
const putProduct = (req, res) => {
    const {id} = req.params;
    const {nombre, precio, detalle, url} = req.body;
    const sentenceSQL = 'UPDATE productos SET nombre = ?, precio = ?, detalle = ?, url = ? WHERE id_pro = ?';

    DB.query(sentenceSQL,[nombre, precio, detalle, url, id],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json({
                mensaje: "Modded",
                row
            })
        }
    })
}
const deleteProduct = (req, res) => {
    const {id} = req.params;
    const sentenceSQL = 'DELETE FROM productos WHERE id_pro = ?';

    DB.query(sentenceSQL,[id],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                mensaje: "Id eliminated" + id + " from productos",
                row
            })
        }
    })
}
// ################## LOGIN (?)
const authorization = (req, res) => {
    const {username} = req.body; 
    const sentenceSQL = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    DB.query(sentenceSQL, [username, username], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row)
            const firmJWT = {
                id_user: row[0].id_user,
                username: row[0].username,
                role: row[0].role
            };
            const token = jwt.sign(firmJWT, process.env.SECRET);
            res.json({
                token
            })
        }
    })
}

// ################## REGISTER API - USER Registers in the DBs.
const registerUser = (req, res) => {
    const {username, password, nomape, tel, dir, email} = req.body;
    const readyPassword = bcrypt.hashSync(password, 10);
    const sentenceSQL = ('INSERT INTO usuarios SET ?');
    DB.query(sentenceSQL,[{username: username, password: readyPassword, tel, dir, nomape, email, role: 'USER'}], (err,row) => {
        if (err) {
            console.log(err);
        } else {
            res.json( {
                message: "Usuario creado con exito"
            })
        }
    })
};

// ################## PEDIDOS (ADMIN)

const getPedidos = (req, res) => { // ### GETS ALL PEDIDOS REQUESTED BY ALL USERS
    const sentenceSQL = 'SELECT P.id_ped AS Numero, P.estado AS Estado, GROUP_CONCAT(L.cant , "x" , PRO.nombre) AS Descripcion, P.hora AS Hora, SUM(L.cant * PRO.precio) AS Total, P.pagoTipo AS Modo_de_pago, US.nomape AS Username, US.dir AS Direccion FROM pedidos AS P INNER JOIN lista AS L ON P.id_ped = L.id_ped_lista INNER JOIN productos AS PRO ON L.id_producto_lista = PRO.id_pro INNER JOIN usuarios AS US ON US.id_user = P.id_user_ped GROUP BY P.id_ped ORDER BY P.hora DESC LIMIT 50;'
    DB.query(sentenceSQL, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row);
            res.json({
                row
            });
        }
    });
}
const getPedidosId = (req, res) => {
    const { id_ped } = req.params;
    const sentenceSQL = 'SELECT GROUP_CONCAT(L.cant , "x" , PRO.nombre) AS Descripcion,GROUP_CONCAT(L.cant * PRO.precio) AS SubTotal, SUM(L.cant * PRO.precio) AS Total, P.estado AS Estado, P.pagoTipo AS Modo_de_pago,US.dir AS Direccion, US.nomape AS NombreCompleto, US.username AS Username, US.email, US.tel FROM pedidos AS P INNER JOIN lista AS L ON P.id_ped = L.id_ped_lista INNER JOIN productos AS PRO ON L.id_producto_lista = PRO.id_pro INNER JOIN usuarios AS US ON US.id_user = P.id_user_ped GROUP BY P.id_ped HAVING P.id_ped = ?;'
    DB.query(sentenceSQL, [id_ped], (err, pedido) => {
        if (err) {
            console.log(err)
        } else {
            console.log(pedido);
            res.json({
                mensaje: "Orden encontrada",
                pedido
            });
        }
    });
}
const getPedidosUserId = (req, res) => {
    const { id_user_ped } = req.params;
    const sentenceSQL = 'SELECT GROUP_CONCAT(L.cant , "x" , PRO.nombre) AS Descripcion,GROUP_CONCAT(L.cant * PRO.precio) AS SubTotal, SUM(L.cant * PRO.precio) AS Total, P.estado AS Estado, P.pagoTipo AS Modo_de_pago,US.dir AS Direccion, US.nomape AS NombreCompleto, US.username AS Username, US.email, US.tel FROM pedidos AS P INNER JOIN usuarios AS US ON US.id_user = P.id_user_ped INNER JOIN lista AS L ON P.id_ped = L.id_ped_lista INNER JOIN productos AS PRO ON L.id_producto_lista = PRO.id_pro WHERE P.id_user_ped = ? GROUP BY P.id_ped ORDER BY P.hora DESC  LIMIT 50;'
    DB.query(sentenceSQL, [id_user_ped], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row);
            res.json({
                row
            });
        }
    });
}
const putPedidoId = (req, res) => {
    const { id_ped } = req.params;
    const { estado } = req.body;
    const sentenceSQL = 'UPDATE pedidos SET estado = ? WHERE id_ped = ?';
    DB.query(sentenceSQL, [estado, id_ped], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                mensaje: "El pedido " + id_ped + " cambio su estado a " + estado,
                row
            })
        }
    })
}
const deletePedidoId = (req, res) => {
    const {id_ped} = req.params;
    const sentenceSQL = 'DELETE FROM pedidos WHERE id_ped = ?';
    DB.query(sentenceSQL,[id_ped],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                mensaje: "Id eliminated" + id + " from Pedidos",
                row
            })
        }
    })
}
// ################# Contact - Users

const getUserById = (req, res) => {
    const {id_user} = req.params
    const sentenceSQL = 'SELECT nomape AS Fullname, username AS Username, dir AS Direccion, tel AS Contacto FROM usuarios WHERE id_user = ?'
    console.log(id_user)
    DB.query(sentenceSQL, [id_user], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row);
            console.log(id_user)
            res.json({
                row
            });
        }
    });
}
const getUsers = (req, res) => {
    console.log("Enters here")
    const sentenceSQL = 'SELECT nomape AS Fullname, username AS Username, dir AS Direccion, tel AS Contacto FROM usuarios WHERE role != "ADM" '
    DB.query(sentenceSQL, (err, row) => {
        console.log(row);
        if (err) {
            console.log(err)
        } else {
            res.json({
                message: "Lista de Usuarios",
                row
            });
        }
    })
}
const putUserById = (req, res) => {
    const {id_user} = req.params;
    const {dir,nomape,NoHashpassword,tel} = req.body;

    let password = "";
    let sentenceSQL = 'UPDATE usuarios SET';

    if (dir != undefined) {
        sentenceSQL = sentenceSQL + ' dir = "' + dir + '"' ;
    }
    if (nomape != undefined) {
        sentenceSQL = sentenceSQL + ', nomape = "' + nomape + '"';
    }
    if (NoHashpassword != undefined) {
        password = bcrypt.hashSync(NoHashpassword, 10);
        sentenceSQL = sentenceSQL + ', password = "' + password + '"';
    }
    if (tel != undefined) {
        sentenceSQL = sentenceSQL + ', tel = "' + tel + '"';
    }

    sentenceSQL = sentenceSQL + ' WHERE id_user = ' + id_user + " ";

    DB.query(sentenceSQL, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json({
                mensaje: "Modded",
                row
            })
        }
    })
}
const deleteUserById = (req, res) => {
    const {id_user} = req.params;
    const sentenceSQL = 'DELETE FROM usuarios WHERE id_user = ?';

    DB.query(sentenceSQL,[id_user],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                mensaje: "Id eliminated" + id_user + " from usuarios",
                row
            })
        }
    })
}
// ################ USER POST A NEW PEDIDO / REQUESTING DISHES.
const postUserPedido = (req, res) => {
    // Information from Body and Headers
    const {pagoTipo, id_pro, cant} = req.body;
    const {authorization} = req.headers;
    // ALL VARS ARE TAKEN - ARRAYS AS WELL.
    const powerWord = authorization.split(' ')[1];
    const id_user = jwt.decode(powerWord,process.env.SECRET).id_user;
    // USER ID NEEDED FROM TOKEN TO MAKE THE REQUEST.
    const sentenceSQLPedidos = 'INSERT INTO pedidos SET ?';
    DB.query(sentenceSQLPedidos, [{pagoTipo: pagoTipo, id_user_ped: id_user}], (err, row) => {
        if (err) {
            console.log(err)
        }
        
    });
    // SEARCH LAST CRAFTED PEDIDO
    const sentenceSQLSearchPedido = 'SELECT id_ped FROM pedidos ORDER BY id_ped DESC LIMIT 1';
    DB.query(sentenceSQLSearchPedido, (err,row) => {
        if (err) {
            console.log(err)
        } else {
            row[0].id_ped;
            const sentenceSQLList = 'INSERT INTO lista SET ?'
            for (let index = 0; index < id_pro.length; index++) {
                DB.query(sentenceSQLList, [{id_ped_lista: row[0].id_ped, id_producto_lista: id_pro[index], cant: cant[index]}], (err, nothing) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
            res.send('Completado')
        }
    });
    // CORRER ESTA SETENCIA POR CUANTOS PRODUCTOS EXISTA EN EL PEDIDO
}

module.exports = {
    getProducts,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct,
    authorization,
    registerUser,
    getPedidos,
    deletePedidoId,
    getPedidosId,
    getPedidosUserId,
    putPedidoId,  // ########### ESTADO DEL PEDIDO
    getUserById,
    deleteUserById,
    getUsers,
    postUserPedido,
    putUserById
};