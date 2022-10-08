import * as User from "../../db/dal/user.js";


export async function signup(req, res, next) {
    console.log("CONTROLLER SIGNUP")
    const { email, password, passwordConfirm, nickname } = req.body;
    
    if (password !== passwordConfirm) {
        return res.status(400).send({
            message: "PASSWORD != PASSWORDCONFIRM"
        });
    }

    const passwordHash = password   // hashing required
    const user = {
        email,
        password: passwordHash,
        nickname,
    }
    console.log(user);

    try {
        const result = await User.createUser(user);

        if (result instanceof Error) {
            return res.status(400).json({
                error: result.message,
                message: result.parent.sqlMessage
            });
        }
        res.status(200).json({
            result,
            message: "SUCCESS"
        });
    } catch (error) {
        console.log("CONTROLLER ERROR")
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}

export async function signin(req, res, next) {
    console.log("CONTROLLER SIGNIN");
    const { email, password } = req.body

    const passwordHash = password;      // hashing required

    // const payload = {};
    // try {
    //     const accessToken = 
    // } catch (error) {
        
    // }

    try {
        const user = await User.findUser(email);
    
        if (user instanceof Error) {
            return res.status(400).json({
                message: "CANNOT FIND EMAIL"
            });
        }
    
        res.status(200).json({
            user,
            message: "SIGNIN SUCCESS"
        });
    } catch (error) {
        console.log("CONTROLLER ERROR")
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }
}