import sequelize from "../config.js";
import UserModel from "../models/user.js";


// createUser
export async function createUser(user) {
    console.log("DAL CREATEUSER");

    try {
        const tableCheck = await sequelize.query("SHOW TABLES LIKE 'Users'");
        if (tableCheck.flatMap(a=>a).length === 0) {
            await UserModel.sync({ alter: true });
        }

        const query = await UserModel.create(user);
    
        return { 
            user: query.get(),
            isNewRecord: query._options.isNewRecord 
        };        
    } catch (error) {
        console.log("DAL ERROR");
        // console.error(error);
        return error;
    }
}


// findUser
export async function findUser(ID) {
    console.log("DAL FINDUSER BY ID");
    console.log(ID, typeof ID);

    const query = { where: {} }
    if (typeof ID === "number") {
        query.where = { userId: ID };
    } else {
        query.where = { email: ID };
    }

    try {
        const user = await UserModel.findOne(query);
        console.log(user.get());
    
        return user.get();
    } catch (error) {
        console.log("DAL ERROR");
        console.error(error);
        return error
    }
}
