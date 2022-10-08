import { DataTypes, Model } from "sequelize";
import sequelize from "../config.js";


class User extends Model {
    getFullname() {
        return [this.firstName, this.lastName].join(" ");
    }
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: "Doe"     /** placeholder if null */
    },
    testId: {
        type: DataTypes.BIGINT(11).ZEROFILL,
    },
    someUnique: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: "User",
    // freezeTableName: true    /** stop auto-pluralization */
    // tableName: "Users"       /** can assign table name directly */
    timestamps: true,           /** basically true by default */
    // createdAt: false         /** disable timestamp column */
    // updatedAt: "updateTime"  /** rename timestamp column */
    indexes: [{ unique: true, fields: ["someUnique"] }]
});


export default User;