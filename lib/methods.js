const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};


const verifyPassword = async (pass,hashedString) =>{

    return await bcrypt.compare(pass,hashedString)
}

const generateToken = async (id,email) =>{

    return jwt.sign({id,email},process.env.PRIVATEKEY)
    
}
module.exports = {hashPassword,verifyPassword, generateToken}