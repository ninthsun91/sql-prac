import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";


class User extends Model {
    static associate(models) {
        this.hasMany(models.Todos, {
            as: "Todos",
            foreignKey: "userId"
        });
    }
};

User.init({
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.TEXT("tiny"),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        defaultValue: "nickname"
    }
}, {
    sequelize,
    modelName: "User",
    timestamps: true,
    updatedAt: false
})


// (async()=>{
//     console.log("SYNC USERS");
//     await User.sync({ alter: true });
// })();


export default User;