import { Router } from "express";
import * as Todo from "../controllers/todo.js";
import authMiddleware from "../../middlewares/auth.js";

const router = Router();


router.route("/")

    //
    .get(Todo.getTodoList)

    // router.post("/", authMiddleware, Todo.createTodo);
    .post(Todo.createTodo);


router.get("/done/:todoId", authMiddleware, Todo.toggleDone);

router.get("/up/:todoId", authMiddleware, Todo.orderUp);

router.get("/down/:todoId", authMiddleware, Todo.orderDown);


router.route("/")
    .get()
    .post()
    .put()


export default router;