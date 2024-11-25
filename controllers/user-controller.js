const dbConnection = require("../db/conn");
const { validateEmail } = require("../validation/regex");
const bcrypt = require("bcryptjs");
const sequelize = require("../db/sqconn");
const { User } = require("../db/Models");

const updateUser = async (req, res, next) => {
  // const conn = await dbConnection();
  await sequelize.sync();
  const { userId } = req.params;
  const { username, email, password, profileImage } = req.body;
  const { id } = req.user;

  if (userId !== id) {
    return next({ msg: "Unauthorized user", code: 401 });
  }

  // const updatedFields = [];
  // const params = [];

  const dataToUpdate = {};
  if (username) {
    // updatedFields.push("username = ?");
    // params.push(username);
    dataToUpdate.username = username;
  }

  if (email) {
    if (!validateEmail(email)) {
      return next({ msg: "Invalid Email address", code: 400 });
    }
    // updatedFields.push("email = ?");
    // params.push(email);
    dataToUpdate.email = email;
  }

  if (password) {
    const hashedPass = await bcrypt.hash(password, 10);
    // updatedFields.push("password = ?");
    // params.push(hashedPass);
    dataToUpdate.password = hashedPass;
  }

  if (profileImage) {
    // updatedFields.push("profileImage = ?");
    // params.push(profileImage);
    dataToUpdate.profileImage = profileImage;
  }

  // if (updatedFields.length === 0) {
  //   return next({ msg: "No data to update", code: 400 });
  // }
  if (Object.keys(dataToUpdate).length === 0) {
    return next({ msg: "No data to update", code: 400 });
  }

  // params.push(userId);

  try {
    // const query = `UPDATE users SET ${updatedFields.join(", ")} WHERE id = ?`;
    // await conn.query(query, params);

    const updatedDetails = await User.update(dataToUpdate,{
      where: {
        id: id
      }
    })
    console.log(updatedDetails)
    res.status(200).json({ msg: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to update user details", code: 500 });
  }
};

const deleteUser = async (req, res, next) => {
  // const conn = await dbConnection();
  const { id } = req.user;
  const { userId } = req.params;

  if (id !== userId) {
    return next({ msg: "Unauthorized User", code: 401 });
  }
  try {
    // const [deletedUser] = await conn.query("DELETE FROM users WHERE id=?", [
    //   userId,
    // ]);

    // if (deletedUser.affectedRows === 0) {
    //   return next({ msg: "User with this id not found", code: 400 });
    // }

    const deletedUser = await User.destroy({
      where: {
        id: id,
      },
    });

    if (!deletedUser) {
      return next({ msg: "Failed to delete user", code: 400 });
    }
    console.log(deletedUser);
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "User Deleted Successfully", success: true });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete user");
  }
};

const signOutUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    if (id !== userId) {
      return next({ msg: "Unauthorized User", code: 401 });
    }

    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "User signout successful", success: true });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to signOut user" });
  }
};

const getUserData = async (req, res, next) => {
  try {
    // const conn = await dbConnection();
    await sequelize.sync();
    const { id } = req.user;
    const { userId } = req.params;

    if (id !== userId) {
      return next({ msg: "Unauthorized User", code: 401 });
    }

    // const [user] = await conn.query("SELECT * FROM users WHERE id=?",[userId])

    // const {password,...userData} = user[0];

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const { password, ...rest } = user.dataValues;

    return res.status(200).json({ user: rest });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to get user data" });
  }
};

module.exports = { updateUser, deleteUser, signOutUser, getUserData };
