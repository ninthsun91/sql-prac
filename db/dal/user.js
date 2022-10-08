import sequelize from "../config.js";
import UserModel from "../models/user.js";


// createUser
export async function createUser(user) {
    console.log("DAL CREATEUSER");

    const tableCheck = await sequelize.query("SHOW TABLES LIKE 'Users'");
    if (tableCheck.flatMap(a=>a).length === 0) {
        await UserModel.sync({ alter: true });
    }

    const query = await UserModel.create(user);
    return { 
        user: query.get(),
        isNewRecord: query._options.isNewRecord 
    };
}


// findUser
export async function findUser(ID) {
    console.log("DAL FINDUSER");

    const query = { where: {} }
    if (typeof ID === "number") {
        query.where = { userId: ID };
    } else {
        query.where = { email: ID };
    }

    const user = await UserModel.findOne(query);
    return user!==null ? user.get() : null;
}