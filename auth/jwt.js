import jwt from "jsonwebtoken";
import env from "../envConfig.js";


export default {
    sign: (payload)=>{
        console.log("CREATE ACCESSTOKEN");

        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60,
        });
    },
    verify: (accessToken)=>{
        console.log("VERIFY ACCESSTOKEN");
        
        try {
            const payload = jwt.verify(accessToken, env.JWT_KEY);
            return {
                tokenFlag: true,
                payload
            };
            
        } catch (error) {
            console.error(error);
            return {
                tokenFlag: false,
                payload: {}
            };
        }
    },
    refresh: ()=>{
        console.log("CREATE REFRESHTOKEN");

        return jwt.sign({}, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*60*24,
        });
    },
    refreshVerify: (refreshToken, payload)=>{
        console.log("VERIFY REFRESHTOKEN");
        
        try {
            jwt.verify(refreshToken, env.JWT_KEY);
            const accessToken = jwt.sign(payload, env.JWT_KEY, {
                algorithm: "HS256",
                expiresIn: 20,
            });

            return {
                tokenFlag: true,
                accessToken
            }
        } catch (error) {
            console.error(error);
            return {
                tokenFlag: false
            }
        }
    },
}