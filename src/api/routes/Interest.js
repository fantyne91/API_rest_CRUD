const { getInterest, postInterest, deleteInterest } = require("../controllers/Interest");

const interestRouter = require("express").Router();


interestRouter.get("/", getInterest);
interestRouter.post("/", postInterest);
 interestRouter.delete("/:id", deleteInterest);

module.exports = interestRouter;