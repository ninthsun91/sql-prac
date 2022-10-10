import { Model, DataTypes } from "sequelize";
import sequelize from "../config.js";


class Todo extends Model {
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: "userId",
        });
    }
};

Todo.init({
    todoId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
            model: "Users",
            key: "userId"
        }
    },
    content: {
        type: DataTypes.TEXT("medium"),
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

// (async()=>{
//     console.log("SYNC TODO");
//     await Todo.sync({ alter: true });
// })();

export default Todo;