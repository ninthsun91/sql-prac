import { Router } from "express";
import * as Todo from "../controllers/todo.js";

const router = Router();


router.get("/", Todo.getTodoList);

router.post("/", Todo.createTodo);

router.get("/done/:todoId", Todo.toggleDone);

router.get("/up/:todoId", Todo.orderUp);

router.get("/down/:todoId", Todo.orderDown);


export default router;