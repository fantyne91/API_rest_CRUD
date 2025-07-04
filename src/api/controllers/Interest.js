const Interest = require("../models/Interest");


//obtiene todos los intereses, catalogo para frontend
const getInterest = async (req, res, next) => {
    try {
        const interest = await Interest.find();
        res.status(200).json(interest);
    } catch (error) {
        return res.status(400).json("No se han podido conseguir");
    }
}

//añade interest si no existe (solo el admin) (pendiente seed)
const postInterest = async (req, res, next) => {
    try {
        interest = await Interest.findOne({ interest: req.body.name });
        if (interest) {
            return res.status(400).json("Ya existe")
        }
        newInterest = new Interest(req.body);        
         const interestSaved = await newInterest.save();
        return res.status(201).json(interestSaved)

    } catch (error) {
        return res.status(400).json("error")        
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

 const deleteInterest = async (req, res, next) => {
     const { id } = req.params;    
     const findInterest = await Interest.findByIdAndDelete(id);
     
     return res.status(200).json({
       message: "Elemento eliminado",
       elemento: findInterest,
     });
 }

module.exports = {
  getInterest,
  postInterest,
  deleteInterest   
};