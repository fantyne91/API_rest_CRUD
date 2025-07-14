/**
 ** Middleware que verifica si el usuario autentificado es :
 * - el mismo que el solicitado en los parámetros de la ruta
 * - o tiene rol de administrador.
 *
 * Si no cumple ninguna condición, devuelve un error 403 (No autorizado).
 *
 * @function isSameUserOrAdmin
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {Function} next - Función middleware siguiente.
 * @returns {void}
 */

const isSameUserOrAdmin = (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.role === "admin" || user._id.toString() === id) {
      return next();
    } else {
      return res.status(403).json({ message: "No autorizado" });
    }
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

module.exports = { isSameUserOrAdmin };
