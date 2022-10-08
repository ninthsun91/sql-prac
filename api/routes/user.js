import { Router } from "express";
import * as User from "../controllers/user.js";


const router = Router();


router.post("/signup", User.signup);

router.post("/signin", User.signin);


export default router;