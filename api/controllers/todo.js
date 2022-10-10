import * as Todo from "../../db/dal/todo.js";
import joi from "../../middlewares/validation.js";


export async function getTodoList(req, res, next) {
    try {
        const todoList = await Todo.findAll();
    
        if (todoList instanceof Error) {
            return res.status(500).json({
                error: todoList.message
            })
        }
        res.status(200).json({
            todoList,
            message: "SUCCESS"
        })
    } catch (error) {
        console.log("CONTROLLER ERROR");
        console.error(error);
        return next(error);
    }
}


export async function createTodo(req, res, next) {
    console.log("CONTROLLER CREATETODO");
    
    try {
        const { userId } = res.locals.user;
        const { content } = await joi.todoPostSchema.validateAsync(req.body);
        const order = await Todo.findLast();
        
        const todo = {
            userId,
            content,
            order
        }
        const result = await Todo.createOne(todo);

        res.status(200).json({
            result,
            message: "SUCCESS"
        });
    } catch (error) {
        console.log("CONTROLLER ERROR");
        console.error(error);
        return next(error)
    }
}


export async function toggleDone(req, res, next) {
    console.log("CONTROLLER TOGGLE DONE");
    const { todoId } = req.params;

    const result = await Todo.reverseDone(Number(todoId));
    if (result[0] === 0) {
        return res.status(500).json({
            message: "TOGGLE FAIL"
        });
    }

    res.status(200).json({
        message: "success"
    });
}


export async function orderUp(req, res, next) {
    console.log("CONTROLLDER ORDERUP");
    const { todoId } = req.params;
    const { order } = req.query;

    try {
        const todoChange = await Todo.findOneOrder(Number(order)+1);
        if (todoChange===null) {
            return res.status(400).json({
                message: "CANNOT CHANGE ORDER"
            });
        }

        await Todo.incrementOne(Number(todoId));
        await Todo.decrementOne(todoChange.get().todoId);
        
        res.status(200).json({
            message: "SUCCESS"
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}


export async function orderDown(req, res, next) {
    console.log("CONTROLLDER ORDERUP");
    const { todoId } = req.params;
    const { order } = req.query;
    
    try {
        const todoChange = await Todo.findOneOrder(Number(order)-1);
        if (todoChange===null) {
            return res.status(400).json({
                message: "CANNOT CHANGE ORDER"
            });
        }

        await Todo.decrementOne(Number(todoId));
        await Todo.incrementOne(todoChange.get().todoId);
        
        res.status(200).json({
            message: "SUCCESS"
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}