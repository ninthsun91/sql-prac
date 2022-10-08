import { Router } from "express";
import * as Todo from "../controllers/todo.js";
import authMiddleware from "../../auth/middleware.js";

const router = Router();


router.get("/", Todo.getTodoList);

router.post("/", authMiddleware, Todo.createTodo);

router.get("/done/:todoId", authMiddleware, Todo.toggleDone);

router.get("/up/:todoId", authMiddleware, Todo.orderUp);

router.get("/down/:todoId", authMiddleware, Todo.orderDown);


export default router;