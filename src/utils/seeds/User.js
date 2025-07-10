const  mongoose  = require("mongoose");
require("dotenv").config();
const userData = require("../../data/userData");
const userModel = require("../../api/models/User");

const bcrypt = require("bcrypt");
const seed = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        /*encripta password desde seed, pq aunque use model no usa el middleware de Model*/
        const hashedUserData = userData.map((user) => ({
            ...user, password: bcrypt.hashSync(user.password, 10), }))
        
        await userModel.collection.drop();
        console.log("eliminados");

        await userModel.insertMany(hashedUserData);
        console.log("insertadas");

        await mongoose.disconnect();
        console.log("desconectado");


    } catch (error) {
        console.log("error")
    }
};
seed()