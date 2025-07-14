const cloudinary = require("cloudinary").v2;

/**
 ** Elimina un archivo almacenado en Cloudinary, dado su URL completo.
 *
 * Obtiene el `public_id` a partir de la ruta de la URL con split y realiza
 * la eliminación del recurso en Cloudinary.
 *
 * @function deleteFile
 * @param {string} url - URL completa de la imagen o recurso en Cloudinary.
 * @returns {void}
 */
const deleteFile = (url) => {

    const array = url.split("/");
    const name = array.at(-1).split(".")[0]; // Get the last part of the URL before the file extension
    const public_Id = `${array.at(-2)}/${name}`; // Construct the public ID for Cloudinary

    cloudinary.uploader.destroy(public_Id, () => {
        console.log("File deleted from Cloudinary");
    })
}

module.exports = { deleteFile };