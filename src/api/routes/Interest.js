const { getInterest, postInterest, updateInterest } = require("../controllers/Interest");

const interestRouter = require("express").Router();


interestRouter.get("/:interest", getInterest);
interestRouter.post("/:id", postInterest);
interestRouter.put("/:id", updateInterest);

module.exports = interestRouter;