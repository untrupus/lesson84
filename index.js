const express = require("express");
const app = express();
const mongoose = require("mongoose");
const tasks = require("./app/tasks");
const users = require("./app/users");
const port = 8000;

app.use(express.json());

const run = async () => {
    await mongoose.connect("mongodb://localhost/todoList", {useNewUrlParser: true, useUnifiedTopology: true});
    app.use("/tasks", tasks);
    app.use("/users", users);
    console.log("Connected");
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);