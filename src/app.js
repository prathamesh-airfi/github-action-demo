const express = require('express');
const todoController = require('./todoController');

const app = express();
app.use(express.json());

app.get('/todos', todoController.getTodos);
app.post('/todos', todoController.createTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);

module.exports = app;