const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    console.log(title, content);

    return res.status(200).json("Hello");
  } catch (error) {
    console.log(error);
    return next({ msg: "Failed to create post", code: 500 });
  }
};


module.exports = {createPost}