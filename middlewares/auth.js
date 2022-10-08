import jwt from "../auth/jwt.js";
import { findUser } from "../db/dal/user.js";

export default async function authMiddleware(req, res, next) {
    console.log("AUTHMIDDLEWARE");
    const { authorization, refreshToken } = req.headers;
    const [tokentype, accessToken] = (authorization || "").split(" ");

    if (!accessToken || tokentype !== "Bearer") {
        res.status(401).json({
            message: "INVALID HEADER"
        });
        return;
    }

    const { tokenFlag, payload } = jwt.verify(accessToken);
    if (tokenFlag) {
        res.locals.user = payload;
        return next();
    } else {
        const userId = req.session[refreshToken];
        if (userId === undefined) {
            res.status(401).json({
                message: "REFRESHTOKEN NOT FOUND"
            });
            return;
        }

        const payload = await findUser(userId);
        const { tokenFlag, newAccessToken } = jwt.refreshVerify(refreshToken, payload);

        if (tokenFlag) {
            res.locals.user = payload;
            res.cookie("accessToken", newAccessToken);
            return next();
        } else {
            res.status(401).json({
                message: "INVALID REFRESH TOKEN"
            });
        }
    }
}