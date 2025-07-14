const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const { getInterest, postInterest, deleteInterest } = require("../controllers/Interest");

const interestRouter = require("express").Router();


interestRouter.get("/", getInterest);
interestRouter.post("/", isAuth, isAdmin, postInterest);
 interestRouter.delete("/:id", isAuth, isAdmin, deleteInterest);

module.exports = interestRouter;