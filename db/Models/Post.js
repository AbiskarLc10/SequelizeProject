const { DataTypes} = require('sequelize')
const sequelize = require('../sqconn')
const { v4: uuidv4 } = require("uuid");

const Post =  sequelize.define('Post',{
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postImage: {
        type: DataTypes.STRING,
    }
},{
    timestamps: true
})

module.exports = Post;