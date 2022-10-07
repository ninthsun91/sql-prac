import { addUser } from "../../db/dal/user.js";


export function createUser(req, res, next) {
    console.log("CONTROLLER USER")
    const user = req.body;
    console.log(user)

    try {
        addUser(user);
        res.status(200).send("SUCCESS") 
    } catch (error) {
        console.error(error);
    }
}