const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  postUserInterest,
} = require("../controllers/User");

const userRouter = require("express").Router();


userRouter.get("/getUsers", getUsers);
userRouter.post("/", postUsers);
userRouter.put("/:id", updateUsers);
userRouter.delete("/:id", deleteUsers); 
userRouter.patch("/:id/interests", postUserInterest);

module.exports = userRouter;