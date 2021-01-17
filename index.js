const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let id = 0;

app.get("/api/v1/todo-svc/get-all-todo", (req, res, next) => {
  res.send(todos);
});

app.post("/api/v1/todo-svc/create-todo", (req, res, next) => {
  const { todo } = req.body;
  const newTodo = {
    text: todo,
    id: id++,
  };
  todos.push(newTodo);
  res.status(200).send({ success: true, data: newTodo });
});

app.delete("/api/v1/todo-svc/delete-todo/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((task) => task.id !== id);
  res.send({
    status: true,
    data: {
      id: id,
    },
  });
});

app.listen(6200, () => {
  console.log("Server started");
});
