const Interest = require("../models/Interest");


/**
 ** Obtiene todos los datos de la base de datos. Sirve como catalogo para el front-end.
 *
 * @async
 * @function getInterest
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @returns {Promise<void>} Envía un array de intereses o un mensaje de error.
 */
const getInterest = async (req, res, next) => {
    try {
        const interest = await Interest.find();
        res.status(200).json(interest);
    } catch (error) {
        return res.status(400).json("No se han podido conseguir");
    }
}


/**
 ** Crea un nuevo interés si no existe previamente y solo si es Admin. Debe autentificarse con Token JWT
 *
 * @async
 * @function postInterest
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {string} req.body.name - Nombre del interés a crear.
 * @returns {Promise<void>} Envía el interés creado o un error.
 *
 * @throws {400} Si el interés ya existe.
 * @throws {500} Si ocurre un error en la creación.
 */
const postInterest = async (req, res, next) => {
    try {
        
        const interest = await Interest.findOne({ name: req.body.name });
        console.log(req.body);
        if (interest) {
            return res.status(400).json("Ya existe")
        }
        
        const newInterest = new Interest(req.body);        
         const interestSaved = await newInterest.save();
        return res.status(201).json(interestSaved)

    } catch (error) {       
        return res.status(500).json({
          message: "Error al crear el interés",
          error: error.message,
        });        
    }
};
// const updateInterest = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const updated = await Interest.findByIdAndUpdate(id, req.body, {
//           new: true,
//         });
//         return res.status(200).json(updated);
//     } catch (error) {
//         return res.status(400).json("error")
//     }
// }

/**
 ** Elimina un interes por Id en la base de datos.
 *
 * @async
 * @function deleteInterest
 * @param {Object} req - Objeto de solicitud HTTP (Express).
 * @param {Object} res - Objeto de respuesta HTTP (Express).
 * @param {string} req.params.id - ID del interés a eliminar.
 * @returns {Promise<void>} Envía el interés eliminado o un error.
 */
 const deleteInterest = async (req, res, next) => {
   try {
      const { id } = req.params;    
      const findInterest = await Interest.findByIdAndDelete(id);
      
      return res.status(200).json({
        message: "Elemento eliminado",
        elemento: findInterest,
      });
   } catch (error) {
    return res.status(400).json("error");
   }
 }

module.exports = {
  getInterest,
  postInterest,
  deleteInterest   
};