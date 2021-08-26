const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Deliah Resto APIs",
            version: "1.0.0",
            description: "All the ends points by Swaggers",
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
        ],
    },
    apis: [ __dirname + "/*.js" ],
}
// API - COMPONENTS - ( SCHEMAS - PARAMETERS)
{
/** 
 * @openapi
 * security:
 *  - bearerAuth: []
 * components:
 *  parameters:
 *      Id_pro:
 *          in: path
 *          name: id_pro
 *          schema:
 *            type: string
 *          requiered: true
 *          description: Product Id (id_pro)
 *      Id_ped:
 *          in: path
 *          name: id_pro
 *          schema:
 *            type: string
 *          requiered: true
 *          description: Product Id (id_pro)
 *      Id_user:
 *          in: path
 *          name: id_pro
 *          schema:
 *            type: string
 *          requiered: true
 *          description: Product Id (id_pro)
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      Login:
 *          title: Login
 *          required:
 *              - username
 *              - password
 *          type: object
 *          properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *              example:
 *                  username: Username
 *                  password: password
 *          
 *      Productos:
 *          type: object
 *          required:
 *              - id_pro
 *              - nombre
 *              - precio
 *          properties:
 *              id_pro:
 *                  type: int
 *                  description: ID del producto
 *              nombre:
 *                  type: string
 *                  description: Nombre del Plato
 *              precio:
 *                  type: float
 *                  description: Precio del Plato
 *              detalle:
 *                  type: string
 *                  description: Descripcion del plato, ingredientes, etc.
 *          example:
 *              id_pro: 1
 *              nombre: PLATO VERDE
 *              precio: 100
 *              detalle: ES UN PLATO VERDE DE PRUEBA,
 *      Pedidos:
 *          type: object
 *          required:
 *              - id_ped
 *              - id_user_ped
 *              - pagoTipo
 *              - hora
 *              - estado
 *          properties:
 *              id_ped:
 *                  type: int
 *                  description: ID del pedido
 *              id_user_ped:
 *                  type: int
 *                  description: ID del usuario del pedido
 *              pagoTipo:
 *                  type: string
 *                  description: Tipo de Pago, "EFE" o "TAR"
 *              hora:
 *                  type: string
 *                  description: Hora de la compra
 *              estado:
 *                  type: string
 *                  description: Estado actual del pedido "NUEVO", "PREPARANDO", "ENVIANDO", "CANCELADO", "ENTREGADO"
 *          example:
 *              id_ped: 3
 *              id_user_ped: 5
 *              pagoTipo: EFE
 *              hora: 19:12:22
 *              estado: NUEVO,
 *      Usuarios:
 *          type: object
 *          required:
 *              - id_user
 *              - nomape
 *              - password
 *              - role
 *              - username
 *              - tel
 *              - dir
 *              - email
 *          properties:
 *              id_user:
 *                  type: int
 *                  description: ID del usuario
 *              nomape:
 *                  type: string
 *                  description: Nombre completo del Usuario
 *              password:
 *                  type: string
 *                  description: Contraseña Hash del Usuario
 *              role:
 *                  type: string
 *                  description: El Role del usuario, "USER" "ADM"
 *              username:
 *                  type: string
 *                  description: El nombre dentro de la base de datos del Usuario
 *              tel:
 *                  type: string
 *                  description: El numero del Usuario
 *              dir:
 *                  type: string
 *                  description: La direccion del Usuario
 *              email:
 *                  type: string
 *                  description: El email del Usuario
 *          example:
 *              id_user: 9
 *              nomape: user
 *              email: user@email.com
 *              tel: 1167785900
 *              password: $9fuadknjnk31n4jlsadl8sdabjsdawd
 *              dir: user
 *              role: USER
 */
}
// API - GET PRODUCTS
{
/**
 * @openapi
 * /productos:
 *      get:
 *          summary: Returns list of all Products
 *          tags: [ Productos ]
 *          responses:
 *              200:
 *                  description: Lista de Productos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Productos'
 */
}
// API - GET PRODUCTS {id_pro}
{
    /**
     * @openapi
     * /productos/{id_pro}:
     *      get:
     *          summary: Return a Product given an ID
     *          tags: [ Productos ]
     *          parameters:
     *            - $ref: '#/components/parameters/Id_pro'
     *          responses:
     *              200:
     *                  description: Producto por ID
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Productos'
     *              404:
     *                  description: No se encuentra el Producto
     */
}
// API - POST PRODUCT
{
/**
 * @openapi
 * /productos:
 *      post:
 *          security:
 *               - bearerAuth: []
 *          summary: Add new product to Products List
 *          tags: [ Productos ]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Productos'
 *          responses:
 *              200:
 *                  description: Se agrego un nuevo Producto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              500:
 *                  description: Some Server Error
 */
}
// API - PUT PRODUCT {id_pro}
{
/**
 * @openapi
 * /productos/{id_pro}:
 *      put:
 *          security:
 *               - bearerAuth: []
 *          summary: Mod an existant product by ID
 *          tags: [ Productos ]
 *          parameters:
 *            - $ref: '#/components/parameters/Id_pro'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Productos'
 *          responses:
 *              200:
 *                  description: Se modifico un producto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              500:
 *                  description: Server Error.
 *              404:
 *                  description: El Producto no se encontro.
 */
}
// API - DELETE PRODUCT {id_pro}
{
/**
 * @openapi
 * /productos/{id_pro}:
 *      delete:
 *          security:
 *               - bearerAuth: []
 *          summary: Delete an existant product by ID
 *          tags: [ Productos ]
 *          parameters:
 *              - $ref: '#/components/parameters/Id_pro'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Productos'
 *          responses:
 *              200:
 *                  description: Se Elimino un producto
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *              404:
 *                  description: El Producto no se encontro.
 */
}
// API - GET PEDIDOS
{
/**
 * @openapi
 * /pedidos:
 *      get:
 *          security:
 *               - bearerAuth: []
 *          summary: Returns list of all pedidos
 *          tags: [ Pedidos ]
 *          responses:
 *              200:
 *                  description: Lista de Pedidos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Pedidos'
 */
}
// API - GET PEDIDOS {id_ped}
{
    /**
     * @openapi
     * /pedidos/{id_ped}:
     *      get:
     *          security:
     *               - bearerAuth: []
     *          summary: Return a Pedido given an ID
     *          tags: [ Pedidos ]
     *          parameters:
     *            - $ref: '#/components/parameters/Id_ped'
     *          responses:
     *              200:
     *                  description: Pedido por ID
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Pedidos'
     *              404:
     *                  description: No se encuentra el Pedido
     */
}
// API - GET PEDIDOS {id_user}
{
    /**
     * @openapi
     * /pedidos/{id_user}:
     *      get:
     *          security:
     *               - bearerAuth: []
     *          summary: Return a Pedido given an ID (User Id)
     *          tags: [ Pedidos ]
     *          parameters:
     *            - $ref: '#/components/parameters/Id_ped'
     *          responses:
     *              200:
     *                  description: Pedido por ID
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Pedidos'
     *              404:
     *                  description: No se encuentra el Pedido
     */
}
// API - POST PEDIDOS
{
/**
 * @openapi
 * /pedidos:
 *      post:
 *          summary: Add a new Pedido - User Only
 *          tags: [ Pedidos ]
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Productos'
 *          responses:
 *              200:
 *                  description: Un nuevo pedido se creo
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Pedidos'
 */
}
// API - PUT PEDIDOS {id_ped}
{
    /**
     * @openapi
     * /Pedidos/{id_ped}:
     *      put:
     *          security:
     *              - bearerAuth: []
     *          summary: Mod the status of an existant pedidos by ID
     *          tags: [ Pedidos ]
     *          parameters:
     *            - $ref: '#/components/parameters/Id_ped'
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Pedidos'
     *          responses:
     *              403:
     *                  description: 'Acceso denegado'
     *              200:
     *                  description: Se modifico el estado del pedido
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Pedidos'
     *              500:
     *                  description: Server Error.
     *              404:
     *                  description: El Pedido no se encontro.
     */
}
// API - DELETE PEDIDOS {id_ped}
{
    /**
     * @openapi
     * /pedidos/{id_ped}:
     *      delete:
     *          security:
     *               - bearerAuth: []
     *          summary: Delete an existant product by ID
     *          tags: [ Pedidos ]
     *          parameters:
     *              - $ref: '#/components/parameters/Id_ped'
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Pedidos'
     *          responses:
     *              200:
     *                  description: Se Elimino un Pedido
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Pedidos'
     *              404:
     *                  description: El Pedido no se encontro.
     */
}
// API - GET USERS
{
/**
 * @openapi
 * /usuarios:
 *      get:
 *          security:
 *               - bearerAuth: []
 *          summary: Returns list of all Users
 *          tags: [ Usuarios ]
 *          responses:
 *              403:
 *                  description: 'Acceso denegado'
 *              200:
 *                  description: Lista de Usuarios
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Usuarios'
 */
}
// API - USER LOGIN
{
/**
 * @openapi
 * /usuarios/login:
 *      post:
 *          summary: Login
 *          tags: [ Usuarios ]
 *  
 *          requestBody:
 *              description: ''
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *                      example:
 *                          username: Username
 *                          password: password
 *              requiered: true
 *          responses:
 *              403:
 *                  description: 'Acceso denegado'
 *              200:
 *                  description: 'Login successful'
 *              500:
 *                  description: Some Server Error
 *                      
 */
}
// API - GET USER {id_user}
{
    /**
     * @openapi
     * /usuarios/{id_user}:
     *      get:
     *          security:
     *               - bearerAuth: []
     *          summary: Return a User given an ID
     *          tags: [ Usuarios ]
     *          parameters:
     *            - $ref: '#/components/parameters/Id_user'
     *          responses:
     *              403:
     *                  description: 'Acceso denegado'
     *              200:
     *                  description: Se encontro el Usuario por ID
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/Usuarios'
     *              404:
     *                  description: No se encuentra el Usuario
     */
}
// API - POST USER - Register
{
/**
 * @openapi
 * /usuarios:
 *      post:
 *          summary: Add new User to Users List (Register)
 *          tags: [ Usuarios ]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuarios'
 *          responses:
 *              200:
 *                  description: Se agrego un nuevo Usuarios
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Usuarios'
 *              500:
 *                  description: Some Server Error
 */
}
// API - PUT USER {id_user}
{
/**
 * @openapi
 * /usuarios/{id_user}:
 *      put:
 *          security:
 *               - bearerAuth: []
 *          summary: Mod an existant User by ID
 *          tags: [ Usuarios ]
 *          parameters:
 *            - $ref: '#/components/parameters/Id_user'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuarios'
 *          responses:
 *              200:
 *                  description: Se modifico un Usuario
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Usuarios'
 *              500:
 *                  description: Server Error.
 *              404:
 *                  description: El Usuario no se encontro.
 *              403:
 *                  description: 'Acceso denegado'
 */
}
// API - DELETE USER {id_user}
{
/**
 * @openapi
 * /usuarios/{id_user}:
 *      delete:
 *          security:
 *               - bearerAuth: []
 *          summary: Delete an existant user by ID
 *          tags: [ Usuarios ]
 *          parameters:
 *              - $ref: '#/components/parameters/id_user'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuarios'
 *          responses:
 *              200:
 *                  description: Se Elimino un Usuario
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Usuarios'
 *              404:
 *                  description: El Usuario no se encontro.
 *              403:
 *                  description: 'Acceso denegado'
 */
}
// CSR MXR SSR
module.exports = {
    options
}