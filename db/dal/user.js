import sequelize from "../config.js";
import UserModel from "../models/user.js";


export async function addUser(user) {
    console.log("DAL USER");

    const query = await sequelize.query("SHOW TABLES LIKE 'Users'")
    if (query.flatMap(a=>a).length === 0) {
        await UserModel.sync({ alter: true });
    }

    const result2 = await UserModel.create(user);
    console.log(result2);
}