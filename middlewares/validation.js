import Joi from "joi";


export default {
    // POST "/user/signup"
    signupSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^\w{3,15}$/).required(),
        passwordConfirm: Joi.string().pattern(/^\w{3,15}$/).required(),
        nickname: Joi.string().pattern(/^\w{3,15}$/),
    }),

    // POST "/user/signin"
    signinSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^\w{3,15}$/).required(),
    }),

    // POST "/todo"
    todoPostSchema: Joi.object({
        content: Joi.string().alphanum().max(100).required(),
    })
}