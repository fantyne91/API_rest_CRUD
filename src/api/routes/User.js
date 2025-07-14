const {
  getUsers,
  login,
  postUsers,
  updateUsers,
  deleteUsers,
  postUserInterest,
} = require("../controllers/User");
const { isAuth } = require("../../middlewares/isAuth");
const { isSameUserOrAdmin } = require("../../middlewares/isSameUserOrAdmin");
const { isAdmin } = require("../../middlewares/isAdmin");
const { upload } = require("../../middlewares/imgFile");

const userRouter = require("express").Router();


userRouter.get("/getUsers", isAuth, isAdmin, getUsers);
userRouter.post("/register", upload.single("img"), postUsers);
userRouter.post("/login", login);
userRouter.put("/:id",isAuth, isSameUserOrAdmin, upload.single("img"),  updateUsers);
userRouter.delete("/:id", isAuth, isSameUserOrAdmin, deleteUsers); 
userRouter.patch("/:id/interests",isAuth,isSameUserOrAdmin, postUserInterest);

module.exports = userRouter;