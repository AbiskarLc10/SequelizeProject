const dbConnection = require("../db/conn");
const bcrypt = require("bcryptjs");
const { validateEmail } = require("../validation/regex");
const jwt = require("jsonwebtoken");
const sequelize = require("../db/sqconn");
const { User } = require("../db/Models/index");
const { hashPassword, verifyPassword, generateToken } = require("../lib/methods");


//Using sequelize
const SignUp = async (req, res, next) => {
  try {
    const { firstName,lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please provide all fields firstName,lastName, email and password",
      });
    }
    const checkUserExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (checkUserExists) {
      return next({ msg: "User already exist", code: 400 });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });

    if (!user) {
      return next({ msg: "Failed to create user", code: 500 });
    }

    console.log(user);

    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    return next({ msg: error.message, code: 500 });
  }
};

const SignIn = async (req,res,next) => {
  try {
    await sequelize.sync();

    
    const { email, password } = req.body;

    if (!email || !password) {
      return next({ msg: "Please provide your credentials", code: 404 });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Please provide all fields username, email and password",
      });
    }

    const userData = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return next({ msg: "Please sign up first before login", code: 404 });
    }

    const checkPassword = await verifyPassword(password,userData.password);

    if(!checkPassword){
      return next({msg:"Invalid Credentials",code:401});
    }

    const {password:pass, ...rest} = userData.dataValues;

    const token = await generateToken(userData.dataValues.id,userData.dataValues.email);

    console.log(token);
    return res.status(200).cookie('token',token).json({messsage:"Sign In successful",success: true, data:rest});

  } catch (error) {
    console.log(error);
    return next({msg:"Failed to sign in user",code:500});
  }
};
//created using raw mysql query
// const SignUp = async (req, res, next) => {
//   const conn = await dbConnection();

//   try {
//     const uid = new ShortUniqueId({length:10})
//     console.log(uid)
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         message: "Please provide all fields username, email and password",
//       });
//     }

//     if (!validateEmail(email)) {
//       return next({ msg: "Please enter valid email", code: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [checkUserExists] = await conn.query(
//       "SELECT * FROM users WHERE email=?",
//       [email]
//     );

//     if (checkUserExists.length === 1) {
//       return next({ msg: "User already exists", code: 400 });
//     }

//     const [results] = await conn.query(
//       "INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)",
//       [uid.randomUUID(),username, email, hashedPassword]
//     );

//     if (!results) {
//       return next({ msg: "Error while creating user", code: 500 });
//     }

//     return res
//       .status(200)
//       .json({ message: "User created successfully", results });
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to create an user");
//   }
// };

// const SignIn = async (req, res, next) => {
//   try {
//     const conn = await dbConnection();
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next({ msg: "Please provide your credentials", code: 404 });
//     }

//     if (!validateEmail(email)) {
//       return res.status(400).json({
//         message: "Please provide all fields username, email and password",
//       });
//     }

//     const [results] = await conn.query(
//       "SELECT id,username,email,password FROM users WHERE email=?",
//       [email]
//     );

//     if (results.length !== 1) {
//       return next({ msg: "Invalid credentials", code: 404 });
//     }

//     const validPassword = await bcrypt.compare(password, results[0].password);

//     if (!validPassword) {
//       return next({ msg: "Invalid credentials", code: 404 });
//     }

//     const { password: pass, ...rest } = results[0];

//     const token =  jwt.sign({
//       email: email,
//       id: results[0].id,
//     },process.env.PRIVATEKEY);

//     console.log(token)
//     return res
//       .cookie('token',token)
//       .status(201)
//       .json({ message: "Sign In successful", success: true, userdata: rest });
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to signin the user");
//   }
// };

module.exports = {
  SignUp,
  SignIn,
};
