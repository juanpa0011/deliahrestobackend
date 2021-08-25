const { Router } = require('express');
const { authorization, registerUser , postProduct, putProduct, deleteProduct, getProducts, getPedidos, getUserById, getUsers, getPedidosId, getPedidosUserId, postUserPedido, putUserById, getProductId, deleteUserById, putPedidoId, deletePedidoId} = require('../controllers/api.controllers.js');
const { queryUsername, queryPassword, validateToken, checkUsername, checkPassword, checkEmail, checkDir, checkTel, checkNombApe, checkContactExistance, checkContactRequest, checkAdminToken } = require('../middlewares/middlewares.js');

const router = Router();
// GET ALL PRODUCTS WITHIN THE DB
router.get('/productos',validateToken, getProducts);
router.get('/producto/:id_pro',validateToken, getProductId);
// ADMIN -- CREATE, MOD, DELETE PRODUCTS OVER THE DB
router.post('/productos', checkAdminToken, postProduct);
router.put('/productos/:id', checkAdminToken, putProduct);
router.delete('/productos/:id', checkAdminToken, deleteProduct);
// LOGIN AND REGISTER
router.post('/login', queryUsername, queryPassword ,authorization);
router.post('/register', checkUsername, checkPassword, checkEmail, checkDir, checkTel, checkNombApe, registerUser);
// GET USER-ACCOUNT ( INFORMATION CAN ONLY ENTERED BY ADMIN - UNLESS USER-ID == USER-REQUESTED)
router.get('/cuenta/:id_user', checkContactExistance, checkContactRequest, getUserById);
router.put('/cuenta/:id_user', checkContactExistance, checkContactRequest, putUserById);
router.delete('/cuenta/:id_user', checkContactExistance, checkAdminToken, deleteUserById);
router.get('/cuentas', checkAdminToken, getUsers);
// ######## PEDIDOS - PEDIDOS BUSQUEDA - PEDIDOS ACCESO DE ADMINISTRADOR / USER - EDICION DE ESTADO DE PEDIDOS - ELIMINAR PEDIDO ID DE LA DB. ( LIMITAR INFORMACION A UN TOTAL DE 50 POR RENDIMIENTO )
router.get('/pedidos',checkAdminToken, getPedidos);
router.get('/pedidos/id_ped/:id_ped', checkContactRequest, getPedidosId);
router.get('/pedidos/id_user_ped/:id_user_ped', checkContactRequest, getPedidosUserId);
// ######### EDIT ESTADO OF AN ORDER
router.put('/pedido/id_ped/:id_ped', checkAdminToken, putPedidoId);
// ######### DELETE ORDER BY ID
router.delete('/pedido/id_ped/:id_ped', checkAdminToken, deletePedidoId);
// USER CREATES A NEW PEDIDO.
router.post('/pedido',validateToken, postUserPedido);

// authorizationUsername
module.exports = router;

/*
MVC

MODELO
VISTA () <- Middleware
CONTROLADOR

*/