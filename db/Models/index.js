const Post = require("./Post");
const User = require("./User");


User.hasMany(Post,{
    foreignKey: 'user_id',
    as: 'posts'
})

Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "User"
})


module.exports= {
    User,
    Post
}