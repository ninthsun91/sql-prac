// imports
import express from "express";

import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = 3000;


// view engine

// statics

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routers
app.use("/user", userRouter);


// error handlers

// listen
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});