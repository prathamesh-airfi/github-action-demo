let todos = [];
let idCounter = 1;

const getTodos = (req, res) => {
    res.json(todos);
};

const createTodo = (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: idCounter++, title, description };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id == id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    res.json(todo);
};

const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(todoIndex, 1);
    res.status(204).send();
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};