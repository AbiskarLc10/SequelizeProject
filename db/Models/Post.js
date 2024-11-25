const { DataTypes} = require('sequelize')
const sequelize = require('../sqconn')


const Post =  sequelize.define('Post',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Post;