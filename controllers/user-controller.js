const { validateEmail } = require("../validation/regex");
const bcrypt = require("bcryptjs");
const { User, Post } = require("../db/Models");
const { verifyPassword } = require("../lib/methods");

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password, newpassword, profileImage } = req.body;
  const { id } = req.user;

  if (userId !== id) {
    return next({ msg: "Unauthorized user", code: 403 });
  }
  const findUserById = await User.findOne({
    where: {
      id: id,
    },
  });
  const checkOldPass = await verifyPassword(password, findUserById.password);

  if (!checkOldPass) {
    return next({ msg: "Your old password mismatched", code: 403 });
  }
  const dataToUpdate = {};
  if (username) {
    dataToUpdate.username = username;
  }

  if (email) {
    if (!validateEmail(email)) {
      return next({ msg: "Invalid Email address", code: 400 });
    }
    dataToUpdate.email = email;
  }

  if (password) {
    const hashedPass = await bcrypt.hash(newpassword, 10);

    dataToUpdate.password = hashedPass;
  }

  if (profileImage) {
    dataToUpdate.profileImage = profileImage;
  }
  if (Object.keys(dataToUpdate).length === 0) {
    return next({ msg: "No data to update", code: 400 });
  }

  try {
    const updatedDetails = await User.update(dataToUpdate, {
      where: {
        id: id,
      },
    });
    console.log(updatedDetails);
    res.status(200).json({ msg: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to update user details", code: 500 });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  const { userId } = req.params;

  if (id !== userId) {
    return next({ msg: "Unauthorized User", code: 403 });
  }
  try {
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
      return next({ msg: "Unauthorized User", code: 403 });
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
    const { id } = req.user;
    const { userId } = req.params;

    if (id !== userId) {
      return next({ msg: "Unauthorized User", code: 403 });
    }

    // const user = await User.findOne({
    //   where: {
    //     id: userId,
    //   },
    //   attributes: {
    //     exclude: ["password"],
    //   },
    // });
    const userData = await User.findAll({
      where: {
        id: id
      },
      include: {
        model: Post,
        as: 'posts'
      },
      attributes: {
        exclude: ['password']
      }
    })
    // return res.status(200).json({ user: user.dataValues });
    return res.status(200).json({ user: userData });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to get user data" });
  }
};

module.exports = { updateUser, deleteUser, signOutUser, getUserData };
