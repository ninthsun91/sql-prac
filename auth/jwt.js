import jwt from "jsonwebtoken";
import env from "../envConfig.js";


export default {
    sign: (payload)=>{
        console.log("CREATE ACCESSTOKEN");

        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 60*10,
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
            expiresIn: 60*60,
        });
    },
    refreshVerify: function(refreshToken, payload) {
        console.log("VERIFY REFRESHTOKEN");
        
        try {
            jwt.verify(refreshToken, env.JWT_KEY);
            const accessToken = this.sign(payload);

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