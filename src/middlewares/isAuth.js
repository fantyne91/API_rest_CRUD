
/**
 ** Middleware que verifica si el usuario esta autentificado.
 * - Obtiene el token JWT del header Authorization.
 * - Verifica el token y obtiene el ID del usuario.
 * - Busca el usuario en la base de datos y lo adjunta a `req.user`.
 * - Elimina el campo `password` del objeto usuario por seguridad.
 *
 * Si la autenticación falla, devuelve un error 401 (No autorizado).
 *
 * @function isAuth
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {import('express').NextFunction} next - Función middleware siguiente.
 * @returns {void}
*/
const User = require("../api/models/User");
const { verifyJWT } = require("../utils/jwt");

const isAuth = async (req, res, next) => { 
    try {
        const [,token] = req.headers.authorization.split(" ");
        console.log(token)
        const { id } = verifyJWT(token);
        // Check if the token is valid and extract the user ID
        const user = await User.findById(id);
        req.user = user;
        user.password = undefined;         
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "No autorizado" });
    }
}

module.exports = { isAuth };