const { Post } = require("../db/Models");

const createPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, content } = req.body;

    const newPost = await Post.create({
      title: title,
      content: content,
      user_id: id,
    });

    if (!newPost) {
      return next({ msg: "Failed to create user post", code: 400 });
    }

    console.log(newPost);
    return res
      .status(200)
      .json({
        message: "Post created successfully",
        success: true,
        post: newPost.dataValues,
      });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to create post", code: 500 });
  }
};

const fetchUserPosts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;

    if (id !== userId) {
      return next({ msg: "Unauthorized user", code: 401 });
    }

    const userPosts = await Post.findAll({
      where: {
        user_id: id,
      },
    });

    if (userPosts.length === 0) {
      return next({ msg: "User haven't posted anything" });
    }

    return res
      .status(200)
      .json({ message: "Post fetched successfully", userPosts });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to fetch user posts", code: 500 });
  }
};



module.exports = { createPost, fetchUserPosts };
