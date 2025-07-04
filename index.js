require("dotenv").config();
const userRouter = require("./src/api/routes/User");
const interestRouter = require("./src/api/routes/Interest");
const { connectDB } = require("./src/config/db");
connectDB(); 

// nos traemos el módulo express que previamente hemos instalado
const express = require("express");

// lo ejecutamos y guardamos en la variable app
const app = express();

//Configurar servidor para recoger datos json
app.use(express.json());
//use router (routes)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/interest", interestRouter)

/* utilizamos nuestro servidor para ponerlo a escuchar con el
 método listen, le tenemos que pasar un puerto
 en el primer parámetro y un callback con la función a ejecutar 
 cuando se ponga a escuchar.*/
app.listen(3000, () => {
  console.log("http://localhost:3000");
});

//Middleware error?? todas las rutas que no tengan respuesta entrarán por aquí
app.use((req, res, next) => {
  return res.status(404).json("Route not found");
});
//Middleware error??
/*
app.use("*", (req,res,next)=>{
  const error= new Error ("route not found");
  error.status=404;
  next(error);
  })
app.use((error, req, res, next) => { 
  return res.status(error.status || 500).json(error.message || Unexpected error)
}*/