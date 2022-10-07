import { Router } from "express";
import * as User from "../controllers/user.js";


const router = Router();


router.get("/", User.createUser);


export default router;