import express from "express";
import cookieParser from "cookie-parser";

import env from "./config.js";
import sequelize from "./db/config.js";

import todoRouter from "./api/routes/todo.js";
import userRouter from "./api/routes/user.js";

const app = express();
const PORT = env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/todo", todoRouter);
app.use("/user", userRouter);


try {
    await sequelize.authenticate();

    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT}`);
    });
} catch (error) {
    console.error(`Unable to connect to the DB: ${error}`);
    process.exit(0);
}