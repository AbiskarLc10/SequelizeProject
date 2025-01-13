const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const authroute = require("./route/auth-route");
const userroute = require("./route/user-route");
const postroute = require("./route/post-route");
const sequelize = require("./db/sqconn");
const { QueryTypes } = require("sequelize");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use("/api/post", postroute);

// app.get("/", async (req,res,next)=>{

//   const data = {
//     id: "3d8b8fbd-93d9-4c16-b937-59f974f4c47d",
//     firstName: "Aman11",
//     lastName: "Hellooo11",
//     email: "aman12345@gmail.com",
//     password: "$2a$10$OuoIxG1pa79RXfxUe.AZZewQ1Va3FJUEqCxEmcxWs5JWAO5ekuzcC",
//   }
  
//   try {

//     const response = await sequelize.query('INSERT INTO users SET id= :id,firstName= :firstName,lastName= :lastName,email= :email,password= :password,createdAt= :create,updatedAt= :update',{
//       replacements: {...data,create: new Date(),update: new Date()},
//       type: QueryTypes.INSERT
//     });

//     if(response[1]){
//       return res.status(200).json({message:"Inserted successfully", success:true});
//     }
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:error.message})
//   }
// })
app.use(errorMiddleware);

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server Listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });

// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const
// app.get("/", (req, res) => {
//   return res.sendFile(__dirname + "/public/index.html");
// });

//Testing random route for sequelize
// app.post("/testuser", async(req,res)=>{

//    await sequelize.sync()

//    const {firstName,lastName} = req.body
//    console.log(req.baseUrl)
//    try {

//     // const result = await User.create({
//     //   firstName: firstName,
//     //   lastName: lastName
//     // })

//     // console.log(result)
//     return  res.status(200).json({message:"Name created successfully"})
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({msg:"Failed to create names"})
//    }
// })

// io.on("connection", (socket) => {
//   console.log("User connected with user id", socket.id);
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//   socket.on("chat message", (msg) => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   });

//   socket.on("isTyping", (msg) => {
//     console.log(msg);
//   });
// });

// io.on("chat message", (socket) => {
//   console.log(socket);
// });
// dbConnection()
//   .then(() => {
//     server.listen(port, () => {
//       console.log(`Server Listening at port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
