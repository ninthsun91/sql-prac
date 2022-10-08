import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";


class User extends Model {}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "User",
    timestamps: true,
    updatedAt: false
})


export default User;