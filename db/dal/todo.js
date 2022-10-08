import sequelize from "../config.js";
import TodoModel from "../models/todo.js";


export async function findAll() {
    console.log("DAL FINDALL");

    try {
        const todoList = await TodoModel.findAll({
            order: [["order", "DESC"]],
            attributes: ["todoId", "userId", "content", "done", "order"]
        });
        const newList = todoList.map((todo)=>{
            return todo.get();
        });
        
        return newList;
    } catch (error) {
        console.log("DAL ERROR");
        return error;
    }
}


export async function findOneId(todoId) {
    return await TodoModel.findOne({
        where: {"todoId": todoId}
    });
}

export async function findOneOrder(order) {
    console.log("findOneOrder: ", order)
    return await TodoModel.findOne({
        where: {"order": order}
    });
}


export async function findLast() {
    console.log("DAL FINDLAST");

    try {
        const tableCheck = await sequelize.query("SHOW TABLES LIKE 'Todos'");
        if (tableCheck.flatMap(a=>a).length === 0) {
            console.log("NO TABLE");
            await TodoModel.sync({ alter: true });
        }
    
        const todo = await TodoModel.findOne({
            order: [["order", "DESC"]]
        });
        if (todo === null) {
            return 1;
        }
        console.log(todo.get());
        return todo.get().order +1;        
    } catch (error) {
        console.log("DAL ERROR");
        return error;
    }

}


export async function createOne(todo) {
    console.log("DAL CREATEONE");

    try {
        const query = await TodoModel.create(todo);

        return {
            todo: query.get(),
            isNewRecord: query._options.isNewRecord
        }        
    } catch (error) {
        console.log("DAL ERROR");
        return error;
    }
}


export async function reverseDone(todoId) {
    console.log("DAL REVERSE DONE");
    return await TodoModel.update({
        done: sequelize.literal('NOT done')
    }, {
        where: { todoId: todoId }
    });
}


export async function incrementOne(todoId) {
    await TodoModel.increment({"order": 1}, {"where": {"todoId": todoId} });
}


export async function decrementOne(todoId) {
    await TodoModel.decrement({"order": 1}, {"where": {"todoId": todoId} });
}