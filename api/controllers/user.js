import bcrypt from "bcrypt";
import env from "../../envConfig.js"
import * as User from "../../db/dal/user.js";
import jwt from "../../auth/jwt.js";
import joi from "../../middlewares/validation.js";


export async function signup(req, res, next) {
    console.log("CONTROLLER SIGNUP")
    try {
        const { email, password, passwordConfirm, nickname } 
            = await joi.signupSchema.validateAsync(req.body);
        if (password !== passwordConfirm) {
            return res.status(400).send({
                message: "PASSWORD != PASSWORDCONFIRM"
            });
        }
    
        const user = {
            email,
            password: await bcrypt.hash(password, env.SALT_ROUND),
            nickname,
        }    
        const result = await User.createUser(user);

        if (result instanceof Error) {
            return res.status(400).json({
                error: result.message,
                message: result.parent.sqlMessage
            });
        }
        if (!result.isNewRecord) {
            const error = new Error("SIGNUP FAIL: isNewRecord: false");
            return next(error);
        }

        res.status(200).json({
            userId: result.user.userId,
            email: result.user.email,
            message: "SUCCESS"
        });
    } catch (error) {
        console.log("CONTROLLER ERROR")
        console.error(error);
        res.status(400).json({
            error: error.message,
            // message: error.parent.sqlMessage
        });
    }
}

export async function signin(req, res, next) {
    console.log("CONTROLLER SIGNIN");
    try {
        const { email, password } = await joi.signinSchema.validateAsync(req.body);

        const user = await User.findUser(email);    
        if (user===null) {
            return res.status(400).json({
                message: "CANNOT FIND EMAIL"
            });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({
                message: "INCORRECT PASSWORD"
            });
        }

        const payload = {
            userId: user.userId,
            email,
            nickname: user.nickname,
            createdAt: user.createdAt
        }

        const refreshToken = jwt.refresh();
        req.session[refreshToken] = user.userId;

        res.status(200).json({
            accessToken: jwt.sign(payload),
            refreshToken,
            message: "SIGNIN SUCCESS"
        });
    } catch (error) {
        console.log("CONTROLLER ERROR")
        console.error(error);
        res.status(400).json({
            error: error.message
        });
    }
}