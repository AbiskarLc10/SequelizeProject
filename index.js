const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const dbConnection = require("./db/conn");
const port = process.env.PORT || 8000;
const authroute = require("./route/auth-route");
const userroute = require("./route/user-route");
const sequelize = require("./db/sqconn");
const User = require("./db/Models/User");

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

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

io.on("connection", (socket) => {
  console.log("User connected with user id", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });

  socket.on("isTyping", (msg)=>{

    console.log(msg)
  })
});

io.on("chat message", (socket) => {
  console.log(socket);
});

sequelize
  .authenticate()
  .then(async() => {
    // await sequelize.sync({ force: true });
    console.log("Connected to database successfully");
    server.listen(port, () => {
      console.log(`Server Listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });

// dbConnection()
//   .then(() => {
//     server.listen(port, () => {
//       console.log(`Server Listening at port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
