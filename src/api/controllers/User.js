/**CRUD create read update delete */

const User = require("../models/User")
const Interest = require("../models/Interest");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("interests", "name");
        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(400).json("error")
    }
};
/*Error si el User con email ya existe*/
const postUsers = async (req, res, next) => {
  try {    
    const newUser = new User(req.body);
    const emailExists= await User.findOne({ email: newUser.email });
    if (emailExists) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }
      const saveUser = await newUser.save();
      return res.status(201).json(saveUser);    
  } catch (error) {
    return res.status(400).json("error");
  }
};

const updateUsers = async (req, res, next) => {
  try {
      const { id } = req.params;
      const newUser = new User(req.body);
      newUser._id = id;
      const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true })
      return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(400).json("error");
  }
}; 
/*Delete user by id */
const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
      const deletedMovie = await User.findByIdAndDelete(id);
      return res.status(200).json({
          message: "Elemento eliminado",
          elemento: deletedMovie
      })
   
  } catch (error) {
    return res.status(400).json("error");
  }
};
/*Post interest en user, si no existe en bd da err, si ya lo tiene en sus intereses da err, si el user no existe da err*/
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
  postUsers,
  updateUsers,
  deleteUsers,
  postUserInterest,
};