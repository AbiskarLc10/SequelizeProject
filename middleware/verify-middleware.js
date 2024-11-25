const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next({ msg: "Unauthorized user", code: 401 });
    }

    jwt.verify(token, process.env.PRIVATEKEY, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      if (data) {
        req.user = data;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to verify user");
  }
};

module.exports = verifyUser;
