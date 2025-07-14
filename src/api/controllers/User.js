/**CRUD create read update delete */
const bcrypt = require("bcrypt");
const User = require("../models/User")
const Interest = require("../models/Interest");
const { generateJWT } = require("../../utils/jwt");
const { deleteFile } = require("../../utils/deleteImgFile");


/**
**Obtiene todos los usuarios de la base de datos
*
 * @async
 * @function getUsers
 * @permission admin
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {Function} next - Función next de Express.
 * @returns {Promise<void>} Respuesta JSON con todos los usuarios.
 *
 * @example
 *  Llamada a la ruta (token de admin)
 * GET /users
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("interests", "name");
        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(400).json("error")
    }
};


/**
 ** Inicia sesión de usuario. Valida email y contraseña usando bcrypt.
 *
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {Function} next - Función next de Express.
 * @returns {Promise<void>} Devuelve token JWT si las credenciales son correctas.
 *
 * @example
 * POST /login
 * Body:
 * {
 *    "email": "example@email.com",
 *    "password": "123456"
 * }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    if (bcrypt.compareSync(password, emailExists.password)) {
      const token = generateJWT(emailExists._id);
      
      return res.status(200).json({token, emailExists});
    } else {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

/**
 ** Crea un nuevo usuario.  Verifica si el email ya existe antes de crear.
 *
 * @async
 * @function postUsers
  * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {Function} next - Función next de Express.
 * @returns {Promise<void>} Devuelve el usuario creado o error.
 *
 * @example
 * POST /users
 * Body:
 * {
 *    "name": "Maria",
 *    "email": "maria@email.com",
 *    "password": "secret"
 * }
 */
const postUsers = async (req, res, next) => {
  try {    
    const newUser = new User(req.body);
    const emailExists= await User.findOne({ email: newUser.email });
    if (emailExists) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    if (req.file) {
      newUser.img = req.file.path;
    }
      const saveUser = await newUser.save();
      return res.status(201).json(saveUser);    
  } catch (error) {
    console.error(error);
    return res.status(400).json("error");
    
  }
};


/**
 ** Actualiza datos user por ID.
 * Si el usuario no es admin, no puede cambiar el rol.
 *
 * @async
 * @function updateUsers
 * @permission admin | user
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {Function} next - Función next de Express.
 * @returns {Promise<void>} Devuelve el usuario actualizado.
 *
 * @example
 * PATCH /users/664cabc123456789
 * Body:
 * {
 *    "name": "Maria Updated"
 * }
 */
const updateUsers = async (req, res, next) => {
  try {
      const { id } = req.params;
    const { role, ...restData } = req.body; // Exclude role from update
    if (role && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para cambiar el rol" });
    }
   
    let dataToUpdate = role ? req.body : restData; // If role is provided, update it, otherwise update the rest of the data
    // Guardamos el path de la imagen si existe en dataToUpdate, con cloudinau
    if (req.file) {
      dataToUpdate.img = req.file.path;
    }
      const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, { new: true })
      return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(400).json("error");
  }
}; 


/**
 ** Elimina un usuario por su ID y elimina la imagen asociada en Cloudinary.
 *
 * @async
 * @function deleteUsers
  * @permission admin | user
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @returns {Promise<void>} Envía una respuesta JSON con el usuario eliminado o un error.
 */
const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    deleteFile(deletedUser.img); // Elimina la imagen del usuario de Cloudinary

      return res.status(200).json({
          message: "Elemento eliminado",
          elemento: deletedUser
      })
   
  } catch (error) {
    console.error(error);
    return res.status(400).json("error");
  }
};

/**
 ** Añade un interés a un usuario.
 *
 * @async
 * @function postUserInterest
 * @permission user | admin
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {string} req.params.id - ID del usuario a introducir interest.
 * @param {string} req.body.interest - Nombre del interés a añadir.
 * @returns {Promise<void>} Envía una respuesta JSON con el usuario actualizado o un error.
 *
 * @throws {404} Si el usuario no existe o el interés no está en la base de datos.
 * @throws {400} Si el usuario ya tiene ese interés.
 */
const postUserInterest = async (req, res, next) => {
  try {
    const { id:userId } = req.params;
    const { interest } = req.body;  
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const interestDoc = await Interest.findOne({ interest });
    if (!interestDoc) {
      return res
        .status(404)
        .json({ message: "El interés no existe en la base de datos" });
    }
    if (user.interests.includes(interestDoc._id)) {
      return res
        .status(400)
        .json({ message: "El usuario ya tiene este interés" });
    }
    user.interests.push(interestDoc._id);

    await user.save();
    await user.populate("interests");

    return res.status(200).json({
      message: "Interés añadido correctamente",
      user,
    });
  } catch (error) {
    return res.status(400).json("error");
  }
}
module.exports = {
  getUsers,
  login,
  postUsers,
  updateUsers,
  deleteUsers,
  postUserInterest,
};