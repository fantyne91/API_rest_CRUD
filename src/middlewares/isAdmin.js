
/** Middleware para verificar si el usuario es administrador.
 * 
* @constant
 * @type {CloudinaryStorage}
 */
const isAdmin = (req, res, next) => { 
    try {
        const user = req.user;
        if (user.role === "admin") {
            return next();
        } else {
            return res.status(403).json({ message: "No autorizado" });
        }
    } catch (error) {
        return res.status(401).json({ message: "No autorizado" });
    }
}

module.exports = { isAdmin };