const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

const verifyJWT = (token) => { 
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateJWT,
    verifyJWT
}
