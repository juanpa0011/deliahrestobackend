const DB = require ('../database/conexion.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkUsername = (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return res.status(403).send('Username es Requerido');
    }
    const sentenceSQL = 'SELECT * FROM usuarios WHERE username = ?';
    DB.query(sentenceSQL, [username], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row);
            if(row.length > 0) {
                return res.status(400).send('Este Username ya existe')
            }
            next();
        }
    })
}
const checkPassword = (req, res, next) => {
    const {password} = req.body; 
    if (!password) {
        return res.status(403).send('Password es Requerido');
    }
    next();
}
const checkNombApe = (req, res, next) => {
    const {nomape} = req.body; 
    if (!nomape) {
        return res.status(403).send('Password es Requerido');
    }
    next();
}
const checkEmail = (req, res, next) => {
    const {email} = req.body; 
    if (!email) {
        return res.status(403).send('Password es Requerido');
    }
    const sentenceSQL = 'SELECT * FROM usuarios WHERE email = ?';
    DB.query(sentenceSQL, [email], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if(row.length > 0) {
                return res.status(400).send('Este email ya existe')
            }
            next();
        }
    })
}
const checkDir = (req, res, next) => {
    const {dir} = req.body; 
    if (!dir) {
        return res.status(403).send('Password es Requerido');
    }
    next();
}
const checkTel = (req, res, next) => {
    const {tel} = req.body; 
    if (!tel) {
        return res.status(403).send('Password es Requerido');
    }
    next();
}
const queryUsername = (req, res, next) => {
    const {username} = req.body;
    const sentenceSQL = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    DB.query(sentenceSQL, [username, username], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            console.log(row)
            if(row.length < 1) {
                return res.status(403).send('We can not find the user');
            }
            next();
        }
    })
}
const queryPassword = (req, res, next) => {
    const {username, password} = req.body; // Middlewear necesario? -> Username existe? Password Existe?
    const sentenceSQL = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    // bcrypt.compareSync(password, row[0].password)
    DB.query(sentenceSQL, [username, username, password], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (!bcrypt.compareSync(password, row[0].password)) {
                return res.status(403).send('Contraseña invalida');
            }
            next();
        }
    })
}
const validateToken = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).send('No Token provided');
        return;
    }
    const powerWord = authorization.split(' ')[1];
    if (!powerWord) {
        res.status(401).send('No Token provided');
        return;
    }
    console.log(jwt.decode(powerWord,process.env.SECRET));
    jwt.verify(powerWord, process.env.SECRET, (err) => {
        if(err) {
            console.log(err)
            res.status(401).send('Token provided is invalid');
        } else {
            next();
        }
    })
}
const checkContactRequest = (req, res, next) => {
    const {authorization} = req.headers;
    const {id_user} = req.params;
    const powerWord = authorization.split(' ')[1];
    const role = jwt.decode(powerWord,process.env.SECRET).role
    const ID = jwt.decode(powerWord,process.env.SECRET).id
    if(role !== "ADM") {
        if(id_user !== ID) {
            return res.status(401).send('Not authorized.');
        }
    }
    next();
}
const checkContactExistance = (req, res, next) => {
    const {id_user} = req.params;
    const sentenceSQL = 'SELECT * FROM usuarios WHERE id_user = ?';
    DB.query(sentenceSQL, [id_user], (err, row) => {
    if (err) {
        console.log(err)
    } else {
        if (row.length == 0) {
            return res.status(403).send('Usuario no existe');
        }
        next();
        }
    })
}

// ########################## Validate TOKEN == ADMIN ###########

const checkAdminToken = (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization == undefined) {
        return res.status(403).send('No token provided')
    }
    if (authorization.length == 0) {
        return res.status(403).send('No valid token provided')
    }
    const powerWord = authorization.split(' ')[1];
    const role = jwt.decode(powerWord,process.env.SECRET).role;
    if(role !== "ADM") {
            return res.status(401).send('Not authorized.');
    }
    next();
}

// ########################## TEST RUNNER #######################


module.exports = {
    checkUsername,
    checkPassword,
    checkNombApe,
    checkEmail,
    checkDir,
    checkTel,
    queryUsername,
    queryPassword,
    validateToken,
    checkContactRequest,
    checkContactExistance,
    checkAdminToken
};