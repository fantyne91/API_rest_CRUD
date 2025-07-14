const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


/**
 * Middleware , Si el usuario tiene rol "admin", permite continuar la ejecución
 * de la ruta. De lo contrario, devuelve un error 403 (No autorizado).
 *
 * @function isAdmin
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @returns {void}
 */
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "API_REST_images",
        allowedFormats: ["jpg", "png", "jpeg", "webp"],
    }
})
const upload = multer({ storage})

module.exports = {upload}