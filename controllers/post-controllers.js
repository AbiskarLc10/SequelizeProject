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

    return res.status(200).json({
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
      return next({ msg: "Unauthorized user", code: 403 });
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

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;
    const dataToBeUpdated = {};
    const { id } = req.user;

    if (title) {
      dataToBeUpdated.title = title;
    }
    if (content) {
      dataToBeUpdated.content = content;
    }

    const postData = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!postData) {
      return next({ msg: "Post not found", code: 404 });
    }

    if (id !== postData.user_id) {
      return next({ msg: "Unauthorized user", code: 401 });
    }

    const updatedPost = await Post.update(dataToBeUpdated, {
      where: {
        id: postId,
      },
    });

    console.log(updatedPost);
    if (!updatedPost) {
      return next({ msg: "Failed to updated the post", code: 400 });
    }

    return res
      .status(201)
      .json({ message: "Post updated successfully", success: true });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to updated the post", code: 500 });
  }
};

const deleteUserPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = req.user;

    const deletedPost = await Post.destroy({
      where: {
        id: postId,
        user_id: id,
      },
    });

    if (!deletedPost) {
      return next({ msg: "Failed to delete the post", code: 401 });
    }

    console.log(deletedPost);

    return res
      .status(200)
      .json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to delete post", code: 500 });
  }
};

module.exports = { createPost, fetchUserPosts, updatePost, deleteUserPostById };
