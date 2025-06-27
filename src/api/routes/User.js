const { getUsers, postUsers, updateUsers, deleteUsers } = require("../controllers/User");

const userRouter = require("express").Router();


userRouter.get("/getUsers", getUsers);
userRouter.post("/postUsers", postUsers);
userRouter.put("/:id", updateUsers);
userRouter.delete("/:id", deleteUsers); 

module.exports = userRouter;