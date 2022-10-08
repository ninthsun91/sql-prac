import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";


class Todo extends Model {};

Todo.init({
    todoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "userId"
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Todo",
    timestamps: true,
    paranoid: true,
});


export default Todo;