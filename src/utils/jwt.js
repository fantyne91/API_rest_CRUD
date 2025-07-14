const jwt = require("jsonwebtoken");

/**
 ** Genera un token JWT con el Id usuario.
 *
 * @param {string} id - El ID del usuario que se incluirá en el token.
 * @returns {string} Token JWT generado.
 */

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

/**
 ** Verifica un token JWT y devuelve decodificado.
 *
 * @param {string}- El token JWT que se desea verificar.
 * @returns {Object} El payload decodificado si el token es válido.
 * @throws {Error} Si el token es inválido o ha expirado.
 */

const verifyJWT = (token) => { 
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateJWT,
    verifyJWT
}
