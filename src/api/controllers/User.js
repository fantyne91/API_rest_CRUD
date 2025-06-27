/**CRUD create read update delete */

const User = require("../models/User")
const Interest = require("../models/Interest");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(400).json("error")
    }
};

const postUsers = async (req, res, next) => {
  try {
    
      const newUser = new User(req.body);
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

module.exports = {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
};