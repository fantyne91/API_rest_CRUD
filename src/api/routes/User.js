const {
  getUsers,
  login,
  postUsers,
  updateUsers,
  deleteUsers,
  postUserInterest,
} = require("../controllers/User");
const isAuth = require("../middlewares/isAuth");
const userRouter = require("express").Router();


userRouter.get("/getUsers", isAuth, getUsers);
userRouter.post("/register", postUsers);
userRouter.post("/login", login);
userRouter.put("/:id", updateUsers);
userRouter.delete("/:id", deleteUsers); 
userRouter.patch("/:id/interests", postUserInterest);

module.exports = userRouter;